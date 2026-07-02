import glob
import re

files = glob.glob(r"*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update grid for Newsletter column on mobile
    content = content.replace(
        '<div class="col-lg-3 col-md-6 col-12 mt-md-4 mt-lg-0 mt-4">',
        '<div class="col-lg-3 col-md-6 col-6 mt-md-4 mt-lg-0 mt-4">'
    )
    
    # Left align copyright and prepare for back to top button matching layout
    content = re.sub(
        r'<div class="text-center">\s*<p class="text-white-50 mb-0">&copy; 2026 StemGen\. All rights reserved\.</p>\s*</div>',
        '<div class="d-flex justify-content-between align-items-center text-start">\n                <p class="text-white-50 mb-0">&copy; 2026 StemGen. All rights reserved.</p>\n            </div>',
        content
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
