// lib/mockData.ts
import { Idea } from './types';

export const mockIdeas: Idea[] = [
  {
    id: '1',
    external_id: 'mittelstand-compliance-ai',
    title: 'KomplyAI — Otomatik Uyumluluk Asistanı',
    description:
      'Alman Mittelstand şirketleri için GDPR, NIS2 ve sektörel yönetmelikleri otomatik izleyen ve raporlayan AI destekli SaaS. Manuel denetim saatlerini %70 azaltır.',
    category: 'b2b',
    tags: ['Uyumluluk', 'GDPR', 'NIS2', 'Otomasyon'],
    score: 91,
    revenue_potential: '€4-8k/ay',
    difficulty: 'Orta',
    time_to_mvp: '4-5 hafta',
    germany_fit: 94,
    market_size: '~18.400 Mittelstand şirketi',
    pain_model:
      'Alman şirketleri her yıl ortalama 340 saati uyumluluk denetimlerine harcıyor. NIS2 direktifi 2024 sonunda zorunlu hale geldi ve birçok KOBİ hazır değil.',
    monetization:
      'Aylık €299-899 SaaS aboneliği. Şirket büyüklüğüne göre kademeli. Yıllık ödeme indirimli.',
    tools: ['Claude API', 'Supabase', 'Vercel', 'PDF.js'],
    steps: [
      'Şirket profili ve sektör bilgisi al',
      'Claude ile güncel yönetmelik taraması yap',
      'Uyumsuzlukları tespit et ve raporla',
      'Haftalık özet email gönder',
    ],
    risks: [
      'Hukuki sorumluluk: "Bu tavsiye değil, analiz" notu şart',
      'Yönetmelik değişikliklerini takip etmek sürekli güncelleme gerektirir',
    ],
    competitors:
      'OneTrust (çok pahalı, enterprise odaklı), SIQR (İngilizce), manuel danışmanlık firmaları. Fark: Türk ekibinin ürettiği, Alman KOBİ\'ye özel, uygun fiyatlı.',
    generated_at: new Date().toISOString(),
  },
  {
    id: '2',
    external_id: 'bau-ai-planner',
    title: 'BauPlan AI — Mimarlık Proje Takip',
    description:
      'Alman inşaat ve mimarlık firmaları için AI destekli proje zaman çizelgesi optimizasyonu ve maliyet tahmini. DIN standartlarını otomatik kontrol eder.',
    category: 'mimarlik',
    tags: ['İnşaat', 'DIN Standartı', 'Proje Yönetimi'],
    score: 87,
    revenue_potential: '€3-6k/ay',
    difficulty: 'Zor',
    time_to_mvp: '6-8 hafta',
    germany_fit: 89,
    market_size: '~7.200 mimarlık & inşaat firması',
    pain_model:
      'Alman inşaat projelerinin %67\'si gecikmeli teslim ediliyor. DIN standartlarına uygunluk kontrolü manuel ve zaman alıcı.',
    monetization:
      '€499/ay temel, €1.200/ay kurumsal. Proje başına €99 ek ücret modeli de mümkün.',
    tools: ['Claude API', 'Three.js', 'Supabase', 'Vercel'],
    steps: [
      'Proje detaylarını ve ekip büyüklüğünü al',
      'AI ile zaman çizelgesi oluştur',
      'DIN uygunluk kontrolü yap',
      'Raporla ve ekiple paylaş',
    ],
    risks: [
      'İnşaat sektörü dijital dönüşüme dirençli olabilir',
      'DIN standart güncellemelerini takip etmek gerekir',
    ],
    competitors:
      'MS Project (karmaşık), Procore (pahalı). Fark: Alman inşaat\'a özel, DIN entegrasyonu, daha basit UX.',
    generated_at: new Date().toISOString(),
  },
  {
    id: '3',
    external_id: 'hr-micro-saas',
    title: 'FlexiHire — Esnek Çalışan Yönetimi',
    description:
      'Almanya\'daki minijob ve yarı zamanlı çalışanları yöneten HR mikro-SaaS. Otomatik mini-job hesaplamaları, vergi formu üretimi ve vardiya planlaması.',
    category: 'mikro',
    tags: ['HR', 'Minijob', 'Vergi', 'Vardiya'],
    score: 83,
    revenue_potential: '€1.5-3k/ay',
    difficulty: 'Kolay',
    time_to_mvp: '2-3 hafta',
    germany_fit: 91,
    market_size: '~250.000 minijob çalıştıran işletme',
    pain_model:
      'Almanya\'da 7+ milyon minijob çalışanı var. İşverenler aylık bordro hesaplamalarını Excel ile yapıyor. Hatalı hesaplama = vergi cezası.',
    monetization:
      '€29/ay (1-5 çalışan), €79/ay (6-20 çalışan). Freemium ile başla.',
    tools: ['Claude API', 'Supabase', 'Vercel', 'jsPDF'],
    steps: [
      'İşletme ve çalışan bilgilerini gir',
      'Vardiya ve çalışma saatlerini kaydet',
      'Otomatik mini-job hesaplama yap',
      'Aylık bordro raporu oluştur',
    ],
    risks: [
      'Vergi kanunu değişikliklerinde güncelleme gerekir',
      'Rakipler çabuk kopyalayabilir — marka bilinirliği önemli',
    ],
    competitors:
      'DATEV (çok kompleks, muhasebecilere özel), Papershift (genel). Fark: Sadece minijob odaklı, çok basit, çok ucuz.',
    generated_at: new Date().toISOString(),
  },
  {
    id: '4',
    external_id: 'supply-chain-ai',
    title: 'LieferkettAI — Tedarik Zinciri Görünürlüğü',
    description:
      'Alman üretim ve lojistik firmalarına gerçek zamanlı tedarik zinciri risk analizi yapan B2B SaaS. AI ile darboğazları öngörür, alternatif tedarikçi önerir.',
    category: 'b2b',
    tags: ['Lojistik', 'Tedarik Zinciri', 'Risk', 'Üretim'],
    score: 78,
    revenue_potential: '€5-12k/ay',
    difficulty: 'Zor',
    time_to_mvp: '8-10 hafta',
    germany_fit: 86,
    market_size: '~12.000 üretim ve lojistik firması',
    pain_model:
      'COVID ve Ukrayna krizi Alman üreticilerin tedarik açıklarını gözler önüne serdi. Şirketler hâlâ reactif çalışıyor.',
    monetization:
      '€799-2.500/ay, entegrasyon karmaşıklığına göre. Enterprise için özel fiyat.',
    tools: ['Claude API', 'Supabase', 'Python API', 'Recharts'],
    steps: [
      'ERP/CSV ile tedarikçi verilerini al',
      'AI ile risk skorlaması yap',
      'Alternatif tedarikçi veritabanında ara',
      'Dashboard\'da görselleştir ve uyar',
    ],
    risks: [
      'ERP entegrasyonu uzun sürebilir (SAP, etc.)',
      'Tedarikçi veri kalitesi düşükse sonuçlar hatalı',
    ],
    competitors:
      'Riskmethods (Japon şirkete satıldı), Resilinc (US odaklı). Fark: Alman KOBİ\'ye özel, hızlı kurulum, Almanca arayüz.',
    generated_at: new Date().toISOString(),
  },
  {
    id: '5',
    external_id: 'real-estate-valuator',
    title: 'ImmoWert AI — Gayrimenkul Değerleme',
    description:
      'Alman gayrimenkul yatırımcıları ve aracı kurumları için AI destekli otomatik mülk değerlemesi ve yatırım getirisi analizi. Bölgesel piyasa trendlerini entegre eder.',
    category: 'mimarlik',
    tags: ['Gayrimenkul', 'Değerleme', 'Yatırım', 'ROI'],
    score: 72,
    revenue_potential: '€2-4k/ay',
    difficulty: 'Orta',
    time_to_mvp: '4-6 hafta',
    germany_fit: 82,
    market_size: '~3.800 gayrimenkul aracı kurumu',
    pain_model:
      'Alman gayrimenkul piyasasında değerleme raporları haftalarca sürüyor ve €500-2.000 arası maliyetli. Yatırımcılar hızlı ön analiz istiyorlar.',
    monetization:
      '€149/ay bireysel, €449/ay ajans. Ek rapor başına €15.',
    tools: ['Claude API', 'Supabase', 'Vercel', 'Leaflet.js'],
    steps: [
      'Mülk adresi ve özelliklerini al',
      'Bölgesel fiyat verilerini çek',
      'AI ile değerleme raporu oluştur',
      'PDF olarak dışa aktar',
    ],
    risks: [
      'Gayrimenkul verilerine erişim lisans gerektirebilir',
      'Değerleme hataları hukuki sorun yaratabilir',
    ],
    competitors:
      'Sprengnetter (pahalı, enterprise), manuel değerleme firmaları. Fark: Fast, uygun fiyat, self-servis.',
    generated_at: new Date().toISOString(),
  },
  {
    id: '6',
    external_id: 'invoice-automation',
    title: 'RechAI — Akıllı Fatura İşleme',
    description:
      'Alman muhasebe departmanları için gelen faturalara AI ile veri çıkarma, muhasebe kodlaması ve ERP entegrasyonu. e-Invoice 2025 standardına hazır.',
    category: 'mikro',
    tags: ['Fatura', 'Muhasebe', 'e-Invoice', 'Otomasyon'],
    score: 85,
    revenue_potential: '€2-5k/ay',
    difficulty: 'Orta',
    time_to_mvp: '3-4 hafta',
    germany_fit: 93,
    market_size: '~45.000 muhasebe departmanlı KOBİ',
    pain_model:
      'Almanya 2025\'te e-Invoice zorunlu hale geldi. Şirketlerin %78\'i hâlâ PDF faturayı manuel işliyor. Dakika başına maliyet yüksek.',
    monetization:
      '€79/ay (500 fatura/ay), €199/ay (sınırsız). Setup bedeli: €299.',
    tools: ['Claude API', 'Supabase', 'Vercel', 'pdf-parse'],
    steps: [
      'PDF/XML fatura yükle',
      'AI ile veri çıkar (satıcı, tutar, tarih, KDV)',
      'Muhasebe kodunu otomatik ata',
      'ERP/DATEV formatında dışa aktar',
    ],
    risks: [
      'e-Invoice standartları hâlâ gelişiyor (ZUGFeRD, XRechnung)',
      'Büyük müşteriler SAP entegrasyonu isteyebilir',
    ],
    competitors:
      'DATEV (muhasebeci bağımlı), Lexoffice (genel). Fark: AI ile sıfır manuel giriş, e-Invoice 2025 odaklı.',
    generated_at: new Date().toISOString(),
  },
];
