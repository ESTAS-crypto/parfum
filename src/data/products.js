// =============================================
// WHATSAPP ADMIN NUMBER
// Ubah nomor ini untuk mengganti admin WhatsApp
// Format: kode negara + nomor (tanpa + atau spasi)
// =============================================
export const ADMIN_WHATSAPP = '6281234567890'

// =============================================
// Helper: Generate WhatsApp link
// =============================================
export function getWhatsAppLink(productName, size) {
    const sizeText = size ? ` (${size})` : ''
    const message = `Halo, saya tertarik dengan parfum *${productName}*${sizeText}. Apakah masih tersedia?`
    return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`
}

// =============================================
// DATA PRODUK PARFUM
// Setiap produk memiliki variasi ukuran/volume
// dengan harga dan skala 3D yang berbeda
// =============================================
export const products = [
    {
        id: 1,
        name: 'Noir Absolu',
        description:
            'Aroma maskulin yang tegas dengan sentuhan oud, amber, dan cedarwood. Parfum untuk mereka yang memimpin tanpa kata.',
        notes: ['Oud', 'Amber', 'Cedarwood', 'Musk'],
        image:
            'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
        badge: 'Best Seller',
        sizes: [
            { volume: '30ml', price: 'Rp 850.000', scale: 0.7 },
            { volume: '50ml', price: 'Rp 1.350.000', scale: 0.85 },
            { volume: '100ml', price: 'Rp 1.850.000', scale: 1.0 },
        ],
        price: 'Rp 1.850.000', // default display price (largest)
    },
    {
        id: 2,
        name: 'Velvet Rose',
        description:
            'Kelembutan mawar Damask yang dipadukan dengan vanilla bourbon dan sandalwood. Elegan, sensual, tak terlupakan.',
        notes: ['Damask Rose', 'Vanilla Bourbon', 'Sandalwood', 'Patchouli'],
        image:
            'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80',
        badge: 'New',
        sizes: [
            { volume: '30ml', price: 'Rp 950.000', scale: 0.7 },
            { volume: '50ml', price: 'Rp 1.550.000', scale: 0.85 },
            { volume: '100ml', price: 'Rp 2.150.000', scale: 1.0 },
        ],
        price: 'Rp 2.150.000',
    },
    {
        id: 3,
        name: 'Éclat d\'Or',
        description:
            'Kilauan emas dalam sebuah botol. Perpaduan saffron, bergamot, dan white musk yang mewah dan memukau.',
        notes: ['Saffron', 'Bergamot', 'White Musk', 'Tonka Bean'],
        image:
            'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
        badge: 'Exclusive',
        sizes: [
            { volume: '30ml', price: 'Rp 1.100.000', scale: 0.7 },
            { volume: '50ml', price: 'Rp 1.750.000', scale: 0.85 },
            { volume: '100ml', price: 'Rp 2.450.000', scale: 1.0 },
        ],
        price: 'Rp 2.450.000',
    },
    {
        id: 4,
        name: 'Midnight Silk',
        description:
            'Misterius seperti malam, lembut seperti sutra. Iris, jasmine, dan black vanilla yang memikat setiap indera.',
        notes: ['Iris', 'Jasmine', 'Black Vanilla', 'Vetiver'],
        image:
            'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
        badge: null,
        sizes: [
            { volume: '30ml', price: 'Rp 900.000', scale: 0.7 },
            { volume: '50ml', price: 'Rp 1.450.000', scale: 0.85 },
            { volume: '100ml', price: 'Rp 1.950.000', scale: 1.0 },
        ],
        price: 'Rp 1.950.000',
    },
]
