// --- 1. Map Initialization (India Centric) ---
var map = L.map('map').setView([20.5937, 78.9629], 5);

// Dark/Blue Map Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Custom Markers
var safeIcon = L.divIcon({className: 'bg-transparent', html: '<i class="fa-solid fa-house-medical text-[#138808] text-3xl shadow-lg drop-shadow-[0_0_5px_rgba(19,136,8,0.8)]"></i>'});
var dangerIcon = L.divIcon({className: 'bg-transparent', html: '<i class="fa-solid fa-triangle-exclamation text-[#FF9933] text-3xl shadow-lg drop-shadow-[0_0_5px_rgba(255,153,51,0.8)]"></i>'});

L.marker([19.0760, 72.8777], {icon: dangerIcon}).addTo(map).bindPopup("Flood Warning: Mumbai");
L.marker([28.7041, 77.1025], {icon: safeIcon}).addTo(map).bindPopup("Shelter: Delhi Camp A");
L.marker([12.9716, 77.5946], {icon: safeIcon}).addTo(map).bindPopup("Shelter: Bangalore Hub");

// --- 2. Flag Color Mouse Trail Animation ---
document.addEventListener('mousemove', function(e) {
    const colors = ['#FF9933', '#FFFFFF', '#138808']; // Saffron, White, Green
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.backgroundColor = randomColor;
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    
    document.body.appendChild(trail);

    // Remove element after animation finishes to prevent memory leaks
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// --- 3. Network & SOS Logic ---
const statusDiv = document.getElementById('network-status');

function updateNetworkStatus() {
    if (navigator.onLine) {
        statusDiv.className = "flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/40 text-green-400 border border-green-500/50 text-sm font-semibold shadow-[0_0_10px_rgba(19,136,8,0.5)]";
        statusDiv.innerHTML = '<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span>Online Mode</span>';
    } else {
        statusDiv.className = "flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/40 text-orange-400 border border-orange-500/50 text-sm font-semibold shadow-[0_0_10px_rgba(255,153,51,0.5)]";
        statusDiv.innerHTML = '<div class="w-2 h-2 bg-orange-500 rounded-full"></div><span>Offline Mesh</span>';
    }
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

function triggerSOS() {
    Swal.fire({
        title: 'JAI HIND! BROADCASTING!',
        text: 'Sending your GPS location to nearest Indian Rescue Teams...',
        icon: 'warning',
        background: '#020617',
        color: '#fff',
        showCancelButton: true,
        confirmButtonColor: '#FF9933',
        cancelButtonColor: '#333',
        confirmButtonText: 'Send Alert',
        backdrop: `rgba(0,0,128,0.4)`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Alert Sent!',
                text: 'Coordinates shared with NDRF.',
                icon: 'success',
                background: '#020617',
                color: '#fff',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}