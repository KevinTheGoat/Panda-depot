#!/usr/bin/env python3
"""
Crop individual product images from Panda Depot catalog page images.
Each page image is 1241 x 1754 pixels.
Products are cropped and saved as: {product_id}_{slugified_name}.png
"""
import json
import os
import re
from PIL import Image

IMAGES_DIR = "src/assets/images"
CATALOG_PATH = "src/data/catalog.json"
OUTPUT_DIR = "src/assets/products"

IMG_W, IMG_H = 1241, 1754


def slugify(name):
    """Convert product name to filename-safe slug."""
    s = name.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s[:60]  # keep filenames reasonable


def crop_grid(img, content_area, rows, cols, cell_index,
              photo_ratio=0.65, padding=5):
    """
    Crop a specific cell from a grid layout.
    content_area: (top, left, bottom, right) of the product grid region
    cell_index: 0-based, reading order (left to right, top to bottom)
    photo_ratio: how much of the cell height is the photo (vs text below)
    """
    top, left, bottom, right = content_area
    area_w = right - left
    area_h = bottom - top
    cell_w = area_w / cols
    cell_h = area_h / rows

    col = cell_index % cols
    row = cell_index // cols

    x1 = int(left + col * cell_w + padding)
    y1 = int(top + row * cell_h + padding)
    x2 = int(left + (col + 1) * cell_w - padding)
    # Only take the photo portion (top part of cell)
    y2 = int(top + row * cell_h + cell_h * photo_ratio)

    # Clamp to image bounds
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(IMG_W, x2)
    y2 = min(IMG_H, y2)

    return img.crop((x1, y1, x2, y2))


def crop_region(img, region, padding=3):
    """Crop a specific (top, left, bottom, right) region."""
    t, l, b, r = region
    return img.crop((
        max(0, l + padding),
        max(0, t + padding),
        min(IMG_W, r - padding),
        min(IMG_H, b - padding)
    ))


# ── Page layout configurations ──
# Each page config maps product IDs to their crop locations.
# "grid" mode: (content_area, rows, cols, product_list_in_order, photo_ratio)
# "manual" mode: list of (product_id, top, left, bottom, right)

PAGE_CONFIGS = {
    # ──── Page 2: Thai Jasmine Rice (1 product, photo at bottom center) ────
    2: {
        "mode": "manual",
        "crops": [
            ("rice-001", 780, 80, 1480, 1160),
        ]
    },

    # ──── Page 3: Duck Sauce (1 product, two buckets center) ────
    3: {
        "mode": "manual",
        "crops": [
            ("sauce-001", 580, 150, 1380, 1090),
        ]
    },

    # ──── Page 4: Rice & Rice Sticks (3x2 grid) ────
    4: {
        "mode": "grid",
        "content_area": (120, 20, 1520, 1220),
        "rows": 2, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["rice-002", "rice-003", "rice-004",
                     "rice-005", "rice-006", "rice-007"]
    },

    # ──── Page 5: Panda Food Pails (3 across, 1 row) ────
    5: {
        "mode": "grid",
        "content_area": (220, 20, 1400, 1220),
        "rows": 1, "cols": 3,
        "photo_ratio": 0.60,
        "products": ["pail-001", "pail-002", "pail-003"]
    },

    # ──── Page 7: Soup Bowls multi-brand (representative photos) ────
    7: {
        "mode": "manual",
        "crops": [
            # Row 1: PANDA brand bowls (3 across top)
            ("soup-001", 220, 20, 510, 400),      # PANDA-36B
            ("soup-002", 220, 400, 510, 810),      # PANDA-39B
            ("soup-003", 220, 810, 510, 1220),     # PANDA-50B
            # Row 3: JN brand smaller bowls
            ("soup-004", 780, 620, 1050, 930),     # JN A08
            ("soup-005", 780, 930, 1050, 1220),    # JN A12
            # Row 4: Other items
            ("soup-006", 1050, 20, 1340, 420),     # 506
            ("soup-007", 1050, 420, 1340, 810),    # S10
            ("soup-008", 1050, 810, 1340, 1220),   # Inner Tray
        ]
    },

    # ──── Page 8: Potato Starch (single product, center) ────
    8: {
        "mode": "manual",
        "crops": [
            ("dry-001", 550, 100, 1380, 1140),
        ]
    },

    # ──── Page 9: Paper Squat Grocery Bags (3 cols) ────
    9: {
        "mode": "grid",
        "content_area": (130, 20, 1520, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        # 8 products but 9 cells, last cell empty or has footer
        "products": ["bag-007", "bag-008", "bag-009",
                     "bag-010", "bag-011", "bag-012",
                     "bag-013", "bag-014", None]
    },

    # ──── Page 10: Fish Sauce (single product) ────
    10: {
        "mode": "manual",
        "crops": [
            ("sauce-002", 550, 150, 1380, 1090),
        ]
    },

    # ──── Page 11: Multi-brand Food Pails (5 sizes, photos show brand variants) ────
    11: {
        "mode": "manual",
        "crops": [
            # Each row shows multiple brands. Crop the most visible photo per size.
            ("pail-004", 180, 20, 490, 420),       # 16oz row - first brand photo
            ("pail-005", 490, 20, 780, 420),        # 26oz row
            ("pail-006", 780, 20, 1060, 420),       # 32oz row
            ("pail-007", 1060, 20, 1340, 420),      # 64oz
            ("pail-008", 1060, 420, 1340, 900),     # 85oz
        ]
    },

    # ──── Page 12: Deli Containers multi-brand (PANDA, FH, JN, YX, Tiger per size) ────
    # 4 rows of sizes, 5-6 brands each. Crop representative photo per size.
    12: {
        "mode": "manual",
        "crops": [
            # Row 1: 18B series (4 cols of brands)
            ("deli-001", 100, 20, 360, 310),       # 12B/818B
            ("deli-002", 100, 310, 360, 620),       # 16B
            ("deli-003", 100, 620, 360, 930),       # 124B
            ("deli-004", 100, 930, 360, 1220),      # 68B
            # Row 2: 23B series
            ("deli-005", 360, 20, 620, 310),        # 78B
            ("deli-006", 360, 310, 620, 620),       # 128B
            ("deli-007", 360, 620, 620, 930),       # 132B
            ("deli-008", 360, 930, 620, 1220),      # 138B
            # Row 3: Round containers
            ("deli-009", 620, 20, 880, 310),        # 18B
            ("deli-010", 620, 310, 880, 620),       # 23B
            ("deli-011", 620, 620, 880, 930),       # 129B
            ("deli-012", 620, 930, 880, 1220),      # 48B
            # Row 4: More
            ("deli-016", 880, 620, 1100, 930),      # FH 129B
        ]
    },

    # ──── Page 13: Soup Containers multi-brand (4 cols per size row) ────
    13: {
        "mode": "manual",
        "crops": [
            ("soup-009", 90, 20, 340, 310),         # 8oz row
            ("soup-010", 340, 20, 580, 310),         # 16oz row
            ("soup-011", 580, 20, 820, 310),         # 32oz row
            ("soup-012", 820, 20, 1060, 310),        # 12oz row
            ("soup-013", 1060, 20, 1300, 310),       # 24oz row
            ("soup-014", 1300, 20, 1520, 310),       # 64oz row
        ]
    },

    # ──── Page 14: PANDA deli containers (4 cols grid) ────
    14: {
        "mode": "manual",
        "crops": [
            ("deli-013", 980, 20, 1260, 310),       # 28B
            ("deli-014", 980, 310, 1260, 620),       # 928BB
            ("deli-015", 1260, 20, 1500, 310),       # 969B
        ]
    },

    # ──── Page 19: JN & Tiger deli containers ────
    19: {
        "mode": "manual",
        "crops": [
            ("deli-017", 50, 20, 280, 310),          # JN 124B -> JN 128B
            ("deli-018", 280, 20, 500, 310),          # JN 132B
            ("deli-019", 280, 310, 500, 620),         # JN 138B
        ]
    },

    # ──── Page 21: Paper Shopping Bags (3x2 grid) ────
    21: {
        "mode": "grid",
        "content_area": (50, 20, 1100, 1220),
        "rows": 2, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["bag-001", "bag-002", "bag-003",
                     "bag-004", "bag-005", "bag-006"]
    },

    # ──── Page 23: Portion Cups & Lids (3x3 grid) ────
    23: {
        "mode": "grid",
        "content_area": (200, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["cup-001", "cup-002", "cup-003",
                     "cup-004", "cup-005", "cup-006",
                     "cup-007", "cup-008", "cup-009"]
    },

    # ──── Page 24: Kraft Eco Boxes (3 cols, 2 rows) ────
    24: {
        "mode": "manual",
        "crops": [
            ("eco-001", 180, 20, 530, 415),
            ("eco-002", 180, 415, 530, 830),
            ("eco-003", 530, 20, 880, 415),
            ("eco-004", 530, 415, 880, 830),
            ("eco-005", 880, 20, 1200, 415),
        ]
    },

    # ──── Page 25: Tableware 2.5g (3x3 grid) ────
    25: {
        "mode": "grid",
        "content_area": (200, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.45,
        "products": ["tw-001", "tw-002", "tw-003",
                     "tw-004", "tw-005", "tw-006",
                     "tw-007", "tw-008", None]
    },

    # ──── Page 26: Tableware 5g Heavy (3x3 grid) ────
    26: {
        "mode": "grid",
        "content_area": (180, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.45,
        "products": ["twh-001", "twh-002", "twh-003",
                     "twh-004", "twh-005", "twh-006",
                     "twh-007", "twh-008", "twh-009"]
    },

    # ──── Page 27: Sushi Trays & Bento (4x3 grid) ────
    27: {
        "mode": "grid",
        "content_area": (170, 20, 1550, 1220),
        "rows": 4, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["sushi-001", "sushi-002", "sushi-003",
                     "sushi-004", "sushi-005", "sushi-006",
                     "sushi-007", "sushi-008", "sushi-009",
                     "sushi-010", "sushi-011", "sushi-012"]
    },

    # ──── Page 28: Sushi Rectangular Black (3x3, 7 products) ────
    28: {
        "mode": "grid",
        "content_area": (130, 20, 1520, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["sushi-013", "sushi-014", "sushi-015",
                     "sushi-016", "sushi-017", "sushi-018",
                     "sushi-019", None, None]
    },

    # ──── Page 29: ClearSeal Containers (3 cols, 3 rows) ────
    29: {
        "mode": "grid",
        "content_area": (170, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["clear-001", "clear-002", "clear-003",
                     "clear-004", "clear-005", "clear-006",
                     "clear-007", "clear-008", None]
    },

    # ──── Page 30: Tamper Evident & Salad Bowls (4x3 grid) ────
    30: {
        "mode": "grid",
        "content_area": (170, 20, 1550, 1220),
        "rows": 4, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["tamper-001", "tamper-002", "tamper-003", "tamper-004",
                     "tamper-005", "tamper-006", "tamper-007", "tamper-008",
                     "tamper-009", "tamper-010", "tamper-011", "tamper-012"]
    },

    # ──── Page 31: Catering Trays (2x3 grid: tray + lid pairs) ────
    31: {
        "mode": "manual",
        "crops": [
            ("cater-001", 200, 20, 620, 620),      # 12" tray + lid
            ("cater-002", 620, 20, 1040, 620),      # 16" tray + lid
            ("cater-003", 1040, 20, 1460, 620),     # 18" tray + lid
        ]
    },

    # ──── Page 32: Dry Goods misc (3x5 grid approx) ────
    32: {
        "mode": "grid",
        "content_area": (100, 20, 1580, 1220),
        "rows": 5, "cols": 3,
        "photo_ratio": 0.50,
        "products": [
            # Row 1: Rice sticks
            None, None, "rice-009",
            # Row 2: Chilies, garlic, bread crumbs
            "dry-002", "dry-003", "dry-004",
            # Row 3: Sesame, tea, potato starch
            "dry-005", "dry-006", "dry-007",
            # Row 4: Pickled ginger x2
            "dry-008", "dry-009", None,
            None, None, None,
        ]
    },

    # ──── Page 33: Cooking Oils/Vinegar/Misc (3x3 grid) ────
    33: {
        "mode": "grid",
        "content_area": (120, 20, 1520, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["oil-001", "oil-002", "dry-010",
                     "dry-011", "oil-004", "oil-003",
                     None, None, "dry-012"]
    },

    # ──── Page 34: Mixed items (3x3 grid) ────
    34: {
        "mode": "grid",
        "content_area": (120, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["dry-013", "dry-014", "dry-015",
                     "dry-016", "dry-017", "rice-008",
                     "sauce-025", "dry-018", "oil-010"]
    },

    # ──── Page 35: Haday Sauces (3x3 grid) ────
    35: {
        "mode": "grid",
        "content_area": (150, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["sauce-003", "sauce-004", "sauce-005",
                     "sauce-006", "sauce-007", "sauce-008",
                     None, None, "sauce-009"]
    },

    # ──── Page 36: LKK Sauces (3x2 grid) ────
    36: {
        "mode": "grid",
        "content_area": (170, 20, 1520, 1220),
        "rows": 3, "cols": 2,
        "photo_ratio": 0.50,
        "products": ["sauce-010", "sauce-011",
                     "sauce-012", "sauce-013",
                     "sauce-014", "sauce-015"]
    },

    # ──── Page 37: KC Sauces (3x3 grid) ────
    37: {
        "mode": "grid",
        "content_area": (60, 20, 1520, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["sauce-016", "sauce-017", "sauce-018",
                     "sauce-019", "sauce-020", "sauce-021",
                     "sauce-022", "sauce-023", "sauce-024"]
    },

    # ──── Page 38: Mixed (baking soda, seasonings, oils - 4x3 grid) ────
    38: {
        "mode": "grid",
        "content_area": (60, 20, 1540, 1220),
        "rows": 4, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["dry-019", "dry-020", "dry-021",
                     "sauce-026", "sauce-027", "sauce-028",
                     "dry-022", "oil-005", "oil-006",
                     None, None, "oil-007"]
    },

    # ──── Page 39: Canned items + oils (3x3 grid) ────
    39: {
        "mode": "grid",
        "content_area": (80, 20, 1540, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["can-001", "can-002", "can-003",
                     "can-004", "can-005", "can-006",
                     "can-007", "oil-008", "oil-009"]
    },

    # ──── Page 40: Dry goods/spices (3x3 grid) ────
    40: {
        "mode": "grid",
        "content_area": (80, 20, 1540, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["dry-023", "dry-024", "dry-025",
                     "dry-026", "dry-027", "dry-028",
                     "dry-029", "dry-030", "dry-031"]
    },

    # ──── Page 41: Canned Foods (3x3 grid) ────
    41: {
        "mode": "grid",
        "content_area": (150, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["can-008", "can-009", "can-010",
                     "can-011", "can-012", "sauce-035",
                     "can-013", "can-014", "can-015"]
    },

    # ──── Page 42: Glassine/Foil bags + Film Wrap (3x3 grid) ────
    42: {
        "mode": "grid",
        "content_area": (160, 20, 1550, 1220),
        "rows": 4, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["wrap-001", "wrap-002", "wrap-003",
                     "wrap-004", "wrap-005", "wrap-006",
                     None, None, "wrap-007",
                     "wrap-008", "wrap-009", "wrap-010"]
    },

    # ──── Page 43: Aluminum Trays (3x4 grid, trays + lids) ────
    43: {
        "mode": "grid",
        "content_area": (150, 20, 1550, 1220),
        "rows": 4, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["alum-001", "alum-002", "alum-003",
                     "alum-004", "alum-005", "alum-006",
                     None, None, None,
                     None, None, None]
    },

    # ──── Page 44: Steam Table Pans (3x3 grid) ────
    44: {
        "mode": "grid",
        "content_area": (170, 20, 1550, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["alum-007", "alum-008", "alum-009",
                     "alum-010", "alum-011", "alum-012",
                     "alum-013", "alum-014", None]
    },

    # ──── Page 45: Foam Containers (3x3 grid) ────
    45: {
        "mode": "grid",
        "content_area": (100, 20, 1540, 1220),
        "rows": 3, "cols": 3,
        "photo_ratio": 0.55,
        "products": ["foam-001", "foam-002", "foam-003",
                     "foam-004", "foam-005", "foam-006",
                     "foam-007", "foam-008", None]
    },

    # ──── Page 46: PP & Foam Containers (4x3 grid) ────
    46: {
        "mode": "grid",
        "content_area": (80, 20, 1540, 1220),
        "rows": 4, "cols": 3,
        "photo_ratio": 0.50,
        "products": ["foam-009", "foam-010", "foam-011",
                     "foam-012", "foam-013", "foam-014",
                     "foam-015", "foam-016", "foam-017",
                     None, "foam-018", "foam-019"]
    },

    # ──── Page 47: Sauce Packets & Seasonings (4x4 grid, no header) ────
    47: {
        "mode": "grid",
        "content_area": (50, 20, 1550, 1220),
        "rows": 4, "cols": 4,
        "photo_ratio": 0.45,
        "products": ["sauce-029", "sauce-030", "sauce-031", "sauce-032",
                     "sauce-033", "sauce-034", None, None,
                     None, None, None, None,
                     "dry-032", "oil-011", None, None]
    },
}


def main():
    # Load catalog for product name lookup
    with open(CATALOG_PATH, 'r') as f:
        catalog = json.load(f)

    # Build product ID -> name mapping
    id_to_name = {}
    for cat in catalog['categories']:
        for prod in cat['products']:
            id_to_name[prod['id']] = prod['name']

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total_cropped = 0
    failed = []

    for page_num, config in sorted(PAGE_CONFIGS.items()):
        page_file = os.path.join(IMAGES_DIR, f"page-{page_num:02d}.png")
        if not os.path.exists(page_file):
            print(f"  WARNING: {page_file} not found, skipping page {page_num}")
            continue

        img = Image.open(page_file)

        if config["mode"] == "manual":
            for entry in config["crops"]:
                prod_id = entry[0]
                region = entry[1:]
                if prod_id is None:
                    continue
                name = id_to_name.get(prod_id, prod_id)
                slug = slugify(name)
                filename = f"{prod_id}_{slug}.png"
                try:
                    cropped = crop_region(img, region)
                    cropped.save(os.path.join(OUTPUT_DIR, filename))
                    total_cropped += 1
                    print(f"  [OK] p{page_num:02d} -> {filename}")
                except Exception as e:
                    failed.append((prod_id, str(e)))
                    print(f"  [FAIL] p{page_num:02d} {prod_id}: {e}")

        elif config["mode"] == "grid":
            content_area = config["content_area"]
            rows = config["rows"]
            cols = config["cols"]
            products = config["products"]
            photo_ratio = config.get("photo_ratio", 0.60)

            for idx, prod_id in enumerate(products):
                if prod_id is None:
                    continue
                name = id_to_name.get(prod_id, prod_id)
                slug = slugify(name)
                filename = f"{prod_id}_{slug}.png"
                try:
                    cropped = crop_grid(img, content_area, rows, cols, idx,
                                       photo_ratio=photo_ratio)
                    cropped.save(os.path.join(OUTPUT_DIR, filename))
                    total_cropped += 1
                    print(f"  [OK] p{page_num:02d} [{idx}] -> {filename}")
                except Exception as e:
                    failed.append((prod_id, str(e)))
                    print(f"  [FAIL] p{page_num:02d} {prod_id}: {e}")

    print(f"\n{'='*60}")
    print(f"Done! Cropped {total_cropped} product images to {OUTPUT_DIR}/")
    if failed:
        print(f"Failed: {len(failed)}")
        for pid, err in failed:
            print(f"  - {pid}: {err}")
    else:
        print("No failures!")

    # Report any products in catalog that weren't cropped
    all_cropped_ids = set()
    for config in PAGE_CONFIGS.values():
        if config["mode"] == "manual":
            for entry in config["crops"]:
                if entry[0]:
                    all_cropped_ids.add(entry[0])
        elif config["mode"] == "grid":
            for pid in config["products"]:
                if pid:
                    all_cropped_ids.add(pid)

    all_catalog_ids = set()
    for cat in catalog['categories']:
        for prod in cat['products']:
            all_catalog_ids.add(prod['id'])

    missing = all_catalog_ids - all_cropped_ids
    if missing:
        print(f"\nProducts in catalog but NOT cropped ({len(missing)}):")
        for pid in sorted(missing):
            name = id_to_name.get(pid, "?")
            print(f"  - {pid}: {name}")


if __name__ == "__main__":
    main()
