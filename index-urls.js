const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_FILE = "gsc-service-account.json";

const URLS = [
  // HALAMAN UTAMA
  "https://miflawandpatners.my.id/",

  // LAYANAN UTAMA
  "https://miflawandpatners.my.id/pengacara-perceraian-bandung.html",
  "https://miflawandpatners.my.id/biaya-pengacara-perceraian.html",
  "https://miflawandpatners.my.id/cerai-talak.html",
  "https://miflawandpatners.my.id/cerai-gugat.html",
  "https://miflawandpatners.my.id/nafkah-iddah-mutah.html",
  "https://miflawandpatners.my.id/hak-asuh-anak.html",
  "https://miflawandpatners.my.id/harta-bersama.html",
  "https://miflawandpatners.my.id/waris.html",
  "https://miflawandpatners.my.id/perwalian.html",

  // PERUSAHAAN
  "https://miflawandpatners.my.id/tentang-kami.html",

  // WILAYAH
  "https://miflawandpatners.my.id/pengacara-perceraian-bandung-barat.html",
  "https://miflawandpatners.my.id/pengacara-perceraian-kabupaten-bandung.html",
  "https://miflawandpatners.my.id/pengacara-perceraian-cimahi.html",

  // ARTIKEL
  "https://miflawandpatners.my.id/artikel/5-hal-sebelum-cerai.html",
  "https://miflawandpatners.my.id/artikel/hak-asuh-anak-islam.html",
  "https://miflawandpatners.my.id/artikel/harta-bersama.html",
  "https://miflawandpatners.my.id/artikel/nafkah-iddah.html",
  "https://miflawandpatners.my.id/artikel/isbat-nikah.html",
  "https://miflawandpatners.my.id/artikel/waris-islam.html",
  "https://miflawandpatners.my.id/artikel/mutah.html",
  "https://miflawandpatners.my.id/artikel/hak-waris-anak-luar-nikah.html",
  "https://miflawandpatners.my.id/artikel/mediasi-pengadilan-agama.html",
  "https://miflawandpatners.my.id/artikel/banding-pengadilan-agama.html",
  "https://miflawandpatners.my.id/artikel/biaya-perceraian-pengadilan-agama.html",
  "https://miflawandpatners.my.id/artikel/contoh-surat-gugatan-cerai.html",
  "https://miflawandpatners.my.id/artikel/prosedur-cerai-pengadilan-agama.html",
  "https://miflawandpatners.my.id/artikel/hak-nafkah-anak-cerai.html",
  "https://miflawandpatners.my.id/artikel/cara-mengurus-surat-nikah.html",
  "https://miflawandpatners.my.id/artikel/perbedaan-cerai-talak-gugat.html",
  "https://miflawandpatners.my.id/artikel/sengketa-utang-perceraian.html",
  "https://miflawandpatners.my.id/artikel/hak-waris-istri-islam.html",
  "https://miflawandpatners.my.id/artikel/konsultasi-hukum-gratis-online.html",
  "https://miflawandpatners.my.id/artikel/isbat-nikah-online.html",
];

async function main() {
  const keyPath = path.join(__dirname, SERVICE_ACCOUNT_FILE);
  if (!fs.existsSync(keyPath)) {
    console.error(`File ${SERVICE_ACCOUNT_FILE} tidak ditemukan!`);
    console.error("Download dari Google Cloud Console → IAM → Service Accounts → Keys");
    process.exit(1);
  }

  const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));

  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const indexing = google.indexing({ version: "v3", auth });

  console.log(`\nIndexing ${URLS.length} URL...\n`);

  let success = 0;
  let failed = 0;

  for (const url of URLS) {
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: { url, type: "URL_UPDATED" },
      });
      console.log(`OK  ${res.data.urlNotificationMetadata.latestUpdate.type} → ${url}`);
      success++;
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message;
      console.error(`FAIL  ${msg} → ${url}`);
      failed++;
    }
  }

  console.log(`\nSelesai: ${success} berhasil, ${failed} gagal\n`);
}

main();
