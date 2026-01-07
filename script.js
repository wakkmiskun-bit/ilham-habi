// --- 1. CONFIGURATION & DATA ---

// ⚠️ PENTING: Ganti nomor ini dengan nomor WhatsApp Admin Anda
const ADMIN_WHATSAPP = '6285191163819'; // Format: 62xxx (kode negara + nomor)

// Link Google Maps Lokasi Toko
const LOCATION_MAPS = 'https://maps.app.goo.gl/8c2KTTQ5nGefe9gcA';

const services = [
    { id: 's1', name: 'Fotocopy BW', price: 500, icon: 'fa-copy', desc: 'Hitam putih tajam' },
    { id: 's2', name: 'Print Warna', price: 2000, icon: 'fa-print', desc: 'Kualitas laser cetak' },
    { id: 's3', name: 'Cetak Dokumen', price: 1000, icon: 'fa-file-pdf', desc: 'A4, F4, & Legal' },
    { id: 's4', name: 'Jilid & Mika', price: 15000, icon: 'fa-book', desc: 'Rapi dan kuat' },
    { id: 's5', name: 'Scan Dokumen', price: 2000, icon: 'fa-scanner', desc: 'Resolusi tinggi HD' },
    { id: 's6', name: 'Laminating', price: 5000, icon: 'fa-layer-group', desc: 'Anti air & awet' },
    { id: 's7', name: 'Cetak Foto', price: 3000, icon: 'fa-image', desc: 'Kertas foto glossy' },
    { id: 's8', name: 'Jilid Hardcover', price: 35000, icon: 'fa-book-open', desc: 'Untuk skripsi/tugas' }
];

const retailProducts = [
    { id: 'p1', name: 'Kertas A4 70gr', price: 55000, img: 'https://via.placeholder.com/300x200?text=Kertas+A4', desc: '1 Rim (500 Lembar)' },
    { id: 'p2', name: 'Map Business', price: 3500, img: 'https://via.placeholder.com/300x200?text=Map+File', desc: 'Warna warni' },
    { id: 'p3', name: 'Bolpoin Gel', price: 5000, img: 'https://via.placeholder.com/300x200?text=Bolpoin', desc: 'Tinta hitam pekat' },
    { id: 'p4', name: 'Buku Nota', price: 7000, img: 'https://via.placeholder.com/300x200?text=Nota+NCR', desc: 'Rangkap 2 (NCR)' },
    { id: 'p5', name: 'Amplop Coklat', price: 2000, img: 'https://via.placeholder.com/300x200?text=Amplop', desc: 'Ukuran Kabinet' },
    { id: 'p6', name: 'Double Tape', price: 8000, img: 'https://via.placeholder.com/300x200?text=Tape', desc: 'Daya rekat kuat' },
    { id: 'p7', name: 'Staples Set', price: 12000, img: 'https://via.placeholder.com/300x200?text=Staples', desc: 'Termasuk isi' },
    { id: 'p8', name: 'Flashdisk 32GB', price: 75000, img: 'https://via.placeholder.com/300x200?text=USB+Drive', desc: 'Original Bergaransi' }
];

let queue = [];

// --- 2. MODERN UI ENGINE ---
const injectStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            --bg-dark: #1e1e1e;
            --card-bg: #2d2d2d;
            --primary: #f9ab00;
            --text-main: #ffffff;
            --text-muted: #b0b0b0;
            --header-footer: #121212;
        }
        
        body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; background: var(--bg-dark); color: var(--text-main); 
            line-height: 1.4;
        }

        /* Modern Loading Styles */
        #loader-wrapper {
            position: fixed;
            inset: 0;
            background: #121212;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s;
        }
        .loader-content { 
            text-align: center; 
            color: var(--primary); 
        }
        .loader-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(249, 171, 0, 0.2);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loader-bar-container {
            width: 200px;
            height: 4px;
            background: rgba(249, 171, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
            margin: 15px auto 0;
        }
        .loader-bar {
            height: 100%;
            background: var(--primary);
            width: 0%;
            animation: loadBar 1.5s ease-in-out forwards;
        }
        @keyframes loadBar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .loader-content p { 
            font-weight: 600; 
            letter-spacing: 2px; 
            text-transform: uppercase; 
            font-size: 0.8rem; 
            margin: 0;
        }
        .loader-hidden { opacity: 0; visibility: hidden; }

        .app-header {
            background: var(--header-footer);
            padding: 12px 24px; position: sticky; top: 0; z-index: 100;
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 1px solid #333;
        }

        .hero-section { 
            padding: 100px 20px; 
            text-align: center;
            background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), 
                        url('Toko foto copy.jpeg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            margin-bottom: 30px;
        }
        .hero-section h2 { 
            font-size: 2.5rem; margin: 0; font-weight: 700; color: var(--primary); 
            text-shadow: 2px 2px 15px rgba(0,0,0,0.8);
        }

        .tab-wrapper { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; }
        .tab-btn {
            padding: 10px 24px; border-radius: 30px; border: 1px solid #444;
            background: #252525; color: var(--text-muted); font-weight: 600; cursor: pointer; transition: 0.3s;
        }
        .tab-btn.active { background: var(--primary); color: #000; border-color: var(--primary); }

        .main-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
            gap: 20px; 
            justify-content: center;
        }

        .card {
            background: var(--card-bg); border-radius: 16px; padding: 20px;
            border: 1px solid #3d3d3d; transition: 0.3s;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            cursor: pointer; height: 100%; min-height: 220px; box-sizing: border-box;
        }
        .card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .card-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 15px; }
        .card-img { width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin-bottom: 12px; }
        .card-title { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        .card-price { color: var(--primary); font-weight: 800; font-size: 1.1rem; margin-top: auto; }

        /* Location Section Styles */
        .location-section {
            background: var(--card-bg);
            padding: 50px 20px;
            margin-top: 60px;
            border-top: 1px solid #333;
        }
        .location-container {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
        }
        @media (max-width: 768px) {
            .location-container {
                grid-template-columns: 1fr;
                gap: 30px;
            }
        }
        .location-info h3 {
            color: var(--primary);
            font-size: 2rem;
            margin-bottom: 20px;
            font-weight: 700;
        }
        .location-details {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .location-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 15px;
            background: #1a1a1a;
            border-radius: 10px;
            border-left: 3px solid var(--primary);
        }
        .location-item i {
            color: var(--primary);
            font-size: 1.3rem;
            min-width: 25px;
        }
        .location-item-content h4 {
            margin: 0 0 5px 0;
            font-size: 0.9rem;
            color: var(--text-muted);
            font-weight: 600;
        }
        .location-item-content p {
            margin: 0;
            font-size: 1rem;
            color: var(--text-main);
            line-height: 1.5;
        }
        .map-container {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            border: 2px solid #333;
            height: 400px;
        }
        .map-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        .map-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: var(--primary);
            color: #000;
            padding: 12px 24px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 700;
            margin-top: 20px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        .map-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(249, 171, 0, 0.4);
        }

        footer { background: var(--header-footer); color: white; padding: 40px 24px 20px; margin-top: 0; }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; max-width: 1100px; margin: 0 auto; }
        .footer-bottom { border-top: 1px solid #333; margin-top: 30px; padding-top: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-muted); }
        
        .wa-float {
            position: fixed; bottom: 25px; right: 25px; background: #25d366; 
            color: white; width: 60px; height: 60px; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; font-size: 30px; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .hidden { display: none !important; }
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 1000; display:flex; align-items:center; justify-content:center; }
        .modal-content { background: var(--card-bg); width: 90%; max-width: 400px; padding: 30px; border-radius: 20px; border: 1px solid #444; }
        input { width: 100%; padding: 14px; margin: 10px 0; background: #1a1a1a; border: 1px solid #444; color: white; border-radius: 10px; box-sizing: border-box; }
        
        .admin-info {
            background: rgba(249, 171, 0, 0.1);
            border: 1px solid rgba(249, 171, 0, 0.3);
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 0.85rem;
            text-align: center;
            color: var(--text-muted);
        }
    `;
    document.head.appendChild(style);
};

// --- 3. APP RENDERING ---
const renderApp = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header class="app-header">
            <div style="display:flex; align-items:center; gap:10px;">
                <i class="fas fa-print" style="color:var(--primary); font-size: 1.5rem;"></i>
                <b style="font-size:1.3rem; letter-spacing: 1.5px;">FASTCOPY</b>
            </div>
            <button onclick="toggleView('antrian')" style="background:none; border:none; color:white; cursor:pointer; font-size:1.4rem;">
                <i class="fas fa-history"></i>
            </button>
        </header>

        <div id="mainView">
            <section class="hero-section">
                <div style="background:rgba(249,171,0,0.2); color:var(--primary); display:inline-block; padding:6px 16px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:15px; letter-spacing: 1px; backdrop-filter: blur(5px); border: 1px solid rgba(249,171,0,0.3);">
                    <i class="fas fa-circle" style="font-size: 8px; vertical-align: middle; margin-right: 5px;"></i> ONLINE • 08:00 - 21:00
                </div>
                <h2>Solusi Cetak Digital</h2>
                <p style="color:#f0f0f0; max-width:600px; margin: 15px auto; text-shadow: 1px 1px 8px rgba(0,0,0,0.8); font-size: 1.1rem;">
                    Layanan berkualitas premium dan perlengkapan kantor lengkap untuk kebutuhan Anda.
                </p>
            </section>

            <div class="tab-wrapper">
                <button class="tab-btn active" id="btn-services" onclick="switchTab('services')">Layanan Jasa</button>
                <button class="tab-btn" id="btn-products" onclick="switchTab('products')">Produk Toko</button>
            </div>

            <div class="main-container">
                <div id="services-grid" class="grid"></div>
                <div id="products-grid" class="grid hidden"></div>
            </div>
        </div>

        <div id="queueView" class="hidden main-container" style="padding-top: 30px; min-height: 60vh;">
            <button onclick="toggleView('main')" style="background:none; border:none; color:var(--primary); font-weight:700; cursor:pointer; margin-bottom:20px; font-size:1rem;">
                <i class="fas fa-arrow-left"></i> Kembali ke Katalog
            </button>
            <h3 style="text-align:center; font-size: 1.5rem; margin-bottom: 30px;">Riwayat Pesanan Anda</h3>
            <div id="queueList" style="max-width: 600px; margin: 0 auto;"></div>
        </div>

        <!-- Location Section with Google Maps -->
        <section class="location-section">
            <div class="location-container">
                <div class="location-info">
                    <h3><i class="fas fa-map-marker-alt"></i> Kunjungi Kami</h3>
                    <div class="location-details">
                        <div class="location-item">
                            <i class="fas fa-map-marked-alt"></i>
                            <div class="location-item-content">
                                <h4>ALAMAT</h4>
                                <p>Jl. Lengkong Besar No.143, Cikawao, Kec. Lengkong, Kota Bandung, Jawa Barat 40261</p>
                            </div>
                        </div>
                        <div class="location-item">
                            <i class="fas fa-clock"></i>
                            <div class="location-item-content">
                                <h4>JAM OPERASIONAL</h4>
                                <p>Senin - Jumat: 08:00 - 17:00<br>Sabtu: 09:00 - 15:00<br>Minggu: Tutup</p>
                            </div>
                        </div>
                        <div class="location-item">
                            <i class="fas fa-phone"></i>
                            <div class="location-item-content">
                                <h4>KONTAK</h4>
                                <p>(022) 5211607</p>
                            </div>
                        </div>
                    </div>
                    <a href="${LOCATION_MAPS}" target="_blank" class="map-button">
                        <i class="fas fa-directions"></i>
                        Buka di Google Maps
                    </a>
                </div>
                <div class="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6738799999997!2d107.61893!3d-6.92861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e86b5ee8a68d%3A0x5d5e5e5e5e5e5e5e!2sJl.%20Lengkong%20Besar%20No.143%2C%20Cikawao%2C%20Kec.%20Lengkong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040261!5e0!3m2!1sid!2sid!4v1234567890"
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </section>

        <footer>
            <div class="footer-grid">
                <div class="footer-col">
                    <h4 style="letter-spacing:1px">FastCopy Sejahtera</h4>
                    <p>Jl. Lengkong Besar 143, Bandung</p>
                    <p>Pusat solusi dokumen dan ATK terpercaya sejak 2020.</p>
                </div>
                <div class="footer-col">
                    <h4>Jam Operasional</h4>
                    <p>Senin - Jumat: 08:00 - 17:00</p>
                    <p>Sabtu: 09:00 - 15:00</p>
                </div>
                <div class="footer-col">
                    <h4>Hubungi Kami</h4>
                    <p><i class="fas fa-phone" style="margin-right:8px"></i> (022) 5211607</p>
                    <p><i class="fab fa-whatsapp" style="margin-right:8px"></i> WhatsApp Admin</p>
                </div>
            </div>
            <div class="footer-bottom">
                <div>© 2026 FastCopy Indonesia</div>
                <div style="color:var(--primary); font-weight: 600;">FastCopy Tech</div>
            </div>
        </footer>

        <a href="https://wa.me/${ADMIN_WHATSAPP}" class="wa-float" target="_blank"><i class="fab fa-whatsapp"></i></a>

        <div id="modalOrder" class="modal hidden">
            <div class="modal-content">
                <h3 style="margin:0 0 15px 0; text-align:center;">Konfirmasi Pesanan</h3>
                
                <div class="admin-info">
                    <i class="fas fa-info-circle"></i> Pesanan akan dikirim ke admin FastCopy
                </div>
                
                <div id="itemDetail" style="background:#222; padding:15px; border-radius:12px; font-size:0.9rem; border-left:5px solid var(--primary); margin-bottom: 20px;"></div>
                <input type="text" id="custName" placeholder="Nama Lengkap Anda">
                <input type="tel" id="custPhone" placeholder="Nomor WhatsApp Anda (contoh: 081234567890)">
                <button onclick="processOrder()" style="background:var(--primary); color:black; border:none; padding:15px; width:100%; border-radius:10px; font-weight:800; cursor:pointer; margin-top:10px; letter-spacing:1px;">KIRIM PESANAN</button>
                <button onclick="closeModal()" style="background:none; border:none; color:gray; width:100%; margin-top:15px; cursor:pointer; font-weight:600;">Kembali</button>
            </div>
        </div>
    `;
    renderGrids();
    updateQueueUI();
};

const renderGrids = () => {
    const sGrid = document.getElementById('services-grid');
    const pGrid = document.getElementById('products-grid');

    sGrid.innerHTML = services.map(s => `
        <div class="card" onclick="openOrder('${s.id}', 'services')">
            <div class="card-icon"><i class="fas ${s.icon}"></i></div>
            <div class="card-title">${s.name}</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px;">${s.desc}</p>
            <div class="card-price">Rp ${s.price.toLocaleString()}</div>
        </div>
    `).join('');

    pGrid.innerHTML = retailProducts.map(p => `
        <div class="card" onclick="openOrder('${p.id}', 'products')">
            <img src="${p.img}" class="card-img" alt="${p.name}">
            <div class="card-title">${p.name}</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px;">${p.desc}</p>
            <div class="card-price">Rp ${p.price.toLocaleString()}</div>
        </div>
    `).join('');
};

// --- 4. LOGIC FUNCTIONS ---
window.switchTab = (type) => {
    document.getElementById('services-grid').classList.toggle('hidden', type !== 'services');
    document.getElementById('products-grid').classList.toggle('hidden', type !== 'products');
    document.getElementById('btn-services').classList.toggle('active', type === 'services');
    document.getElementById('btn-products').classList.toggle('active', type === 'products');
};

let selectedItem = null;
window.openOrder = (id, type) => {
    const list = type === 'services' ? services : retailProducts;
    selectedItem = list.find(x => x.id === id);
    document.getElementById('itemDetail').innerHTML = `
        <span style="color:var(--text-muted); font-size:0.8rem;">Item:</span><br>
        <b style="font-size:1.1rem;">${selectedItem.name}</b><br>
        <div style="margin-top:8px;"><span style="color:var(--text-muted); font-size:0.8rem;">Harga:</span> 
        <b style="color:var(--primary)">Rp ${selectedItem.price.toLocaleString()}</b></div>
    `;
    document.getElementById('modalOrder').classList.remove('hidden');
};

window.closeModal = () => document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));

window.toggleView = (view) => {
    document.getElementById('mainView').classList.toggle('hidden', view === 'antrian');
    document.getElementById('queueView').classList.toggle('hidden', view !== 'antrian');
    window.scrollTo(0,0);
};

window.processOrder = () => {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    
    if(!name || !phone) {
        alert("Mohon isi Nama dan Nomor WhatsApp Anda!");
        return;
    }

    // Format nomor telepon pelanggan untuk ditampilkan
    const cleanPhone = phone.replace(/\D/g, '');
    let displayPhone = cleanPhone;
    if (cleanPhone.startsWith('0')) {
        displayPhone = '0' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('62')) {
        displayPhone = '0' + cleanPhone.substring(2);
    }

    // Format pesan WhatsApp yang akan dikirim ke ADMIN
    const message = `*🔔 PESANAN BARU - FASTCOPY*

📋 *Detail Pesanan:*
Produk: ${selectedItem.name}
Harga: Rp ${selectedItem.price.toLocaleString()}

👤 *Data Pelanggan:*
Nama: ${name}
No. WhatsApp: ${displayPhone}

📅 Waktu Pesanan: ${new Date().toLocaleString('id-ID', { 
    dateStyle: 'full', 
    timeStyle: 'short' 
})}

---
_Pesan otomatis dari Website FastCopy_`;

    // Simpan ke riwayat
    const timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    queue.push({ 
        name, 
        phone: displayPhone, 
        item: selectedItem.name, 
        price: selectedItem.price, 
        time: timeString 
    });
    
    // Kirim ke WhatsApp ADMIN (bukan ke nomor pelanggan)
    const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
    
    closeModal();
    updateQueueUI();
    
    // Reset form
    document.getElementById('custName').value = '';
    document.getElementById('custPhone').value = '';
    
    // Tampilkan notifikasi sukses
    alert('Pesanan Anda akan dikirim ke admin FastCopy via WhatsApp. Terima kasih! 🙏');
};

function updateQueueUI() {
    const list = document.getElementById('queueList');
    if(!list) return;
    list.innerHTML = queue.length === 0 ? 
        "<div style='text-align:center; padding:40px; color:var(--text-muted)'><i class='fas fa-folder-open' style='font-size:3rem; margin-bottom:15px; opacity:0.3'></i><p>Belum ada riwayat pesanan.</p></div>" : 
        queue.map(q => `
            <div style="background:var(--card-bg); padding:15px; margin-bottom:15px; border-radius:12px; border-left:5px solid var(--primary); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <b style="font-size:1rem;">${q.item}</b><br>
                    <small style="color:var(--text-muted); font-size:0.8rem;">${q.name} • <i class="far fa-clock"></i> ${q.time}</small>
                </div>
                <div style="color:var(--primary); font-weight:700; font-size:0.7rem;">TERKIRIM</div>
            </div>
        `).reverse().join('');
}

// Init
injectStyles();
renderApp();

// Handle Loading Exit dengan animasi loading bar
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 1800); // 1.8 detik untuk loading selesai
});