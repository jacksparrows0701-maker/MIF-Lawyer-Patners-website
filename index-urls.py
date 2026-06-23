"""
Google Indexing API - Batch Submit URLs
Kirim semua URL dari sitemap.xml ke Google Indexing API sekaligus.

Cara pakai:
    python index-urls.py
"""

import xml.etree.ElementTree as ET
from google.oauth2 import service_account
from googleapiclient.discovery import build

# === KONFIGURASI ===
KEY_FILE = "gsc-service-account.json"
SITEMAP_FILE = "sitemap.xml"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

# === BACA URL DARI SITEMAP ===
def get_urls_from_sitemap(sitemap_path):
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = []
    for url in root.findall("sm:url", ns):
        loc = url.find("sm:loc", ns)
        if loc is not None:
            urls.append(loc.text.strip())
    return urls

# === MAIN ===
def main():
    # Baca URL
    urls = get_urls_from_sitemap(SITEMAP_FILE)
    print(f"\nDitemukan {len(urls)} URL dari sitemap.xml\n")

    # Autentikasi
    credentials = service_account.Credentials.from_service_account_file(
        KEY_FILE, scopes=SCOPES
    )
    service = build("indexing", "v3", credentials=credentials)

    # Kirim batch request (max 100 per batch)
    batch = service.new_batch_http_request(callback=batch_callback)
    for url in urls:
        batch.add(
            service.urlNotifications().publish(
                body={"url": url, "type": "URL_UPDATED"}
            )
        )

    print(f"Mengirim {len(urls)} URL ke Google Indexing API...\n")
    batch.execute()


def batch_callback(request_id, response, exception):
    if exception:
        print(f"  Gagal: {request_id} - {exception}")
    else:
        url = response.get("urlNotificationMetadata", {}).get("url", request_id)
        status = response.get("latestUpdate", {}).get("type", "")
        print(f"  OK: {url}")


if __name__ == "__main__":
    main()
