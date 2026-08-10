/**
 * GANTI INI ke alamat backend kamu di Pterodactyl.
 * Contoh: "http://123.45.67.89:11547"
 */
const API_URL = "https://angelinlegal.pteroqdactyl.my.id:11547/";

const nomorEl = document.getElementById("nomor");
const pesanEl = document.getElementById("pesan");
const counterEl = document.getElementById("counter");
const btnKirim = document.getElementById("btnKirim");
const statusEl = document.getElementById("status");

pesanEl.addEventListener("input", () => {
  counterEl.textContent = pesanEl.value.length;
});

btnKirim.addEventListener("click", async () => {
  const pesan = pesanEl.value.trim();
  const nomor = nomorEl.value.trim();

  if (!nomor) {
    tampilkanStatus("Isi dulu nomor WA tujuan.", "error");
    return;
  }
  if (!pesan) {
    tampilkanStatus("Pesan tidak boleh kosong.", "error");
    return;
  }

  btnKirim.disabled = true;
  btnKirim.textContent = "Mengirim...";
  statusEl.textContent = "";
  statusEl.className = "status";

  try {
    const res = await fetch(`${API_URL}/api/kirim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pesan, nomor }),
    });

    const data = await res.json();

    if (res.ok && data.ok) {
      tampilkanStatus("✅ Pesan berhasil dikirim!", "success");
      pesanEl.value = "";
      counterEl.textContent = "0";
    } else {
      tampilkanStatus("❌ " + (data.error || "Gagal mengirim pesan."), "error");
    }
  } catch (err) {
    tampilkanStatus("❌ Tidak bisa terhubung ke server.", "error");
  } finally {
    btnKirim.disabled = false;
    btnKirim.textContent = "Kirim";
  }
});

function tampilkanStatus(teks, tipe) {
  statusEl.textContent = teks;
  statusEl.className = "status " + tipe;
}
