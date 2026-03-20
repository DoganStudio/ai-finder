# SaaS Fikir Motoru — Proje Dökümanı (PRD)

> Bu dosya antigravity'e verilecek tam proje spesifikasyonudur.
> Her özellik, her ekran, her veri modeli burada tanımlanmıştır.

---

## 1. Proje Özeti

**Uygulama adı:** SaaS Fikir Motoru  
**Dil:** Türkçe  
**Platform:** Web app (Vercel'de yayınlanan Next.js uygulaması)  
**Kullanıcı sayısı:** Maksimum 5 kişilik ekip  
**Amaç:** Claude API kullanarak trend SaaS fikirleri otomatik üretmek, Almanya B2B pazarına uygunluğunu analiz etmek, ekibin bu fikirleri görüp arşivleyebildiği bir board sunmak.

---

## 2. Tech Stack

| Katman | Araç | Notlar |
|--------|------|--------|
| Frontend | Next.js 14 (App Router) | Vercel'e deploy edilecek |
| Styling | Tailwind CSS | Dark theme varsayılan |
| Auth | Supabase Auth | Email/şifre ile giriş |
| Veritabanı | Supabase (PostgreSQL) | Fikirler ve kullanıcılar burada |
| AI | Anthropic Claude API (claude-sonnet-4-6) | Fikir üretimi ve analiz |
| Deployment | Vercel | Otomatik deploy (GitHub bağlantısı) |
| Cron (opsiyonel) | Vercel Cron Jobs | Günlük otomatik fikir üretimi |

---

## 3. Kullanıcı Akışı

```
1. Kullanıcı uygulamaya girer
2. Login sayfası açılır (Supabase Auth)
3. Email + şifre ile giriş
4. Dashboard (Fikir Board'u) açılır
5. "Fikirleri Getir" butonuna basar VEYA sabah otomatik gelmiş olur
6. Fikir kartlarını inceler
7. Beğendiği fikri arşive kaydeder
8. Arşiv sekmesinden kayıtlı fikirlere bakar
```

---

## 4. Sayfalar ve Ekranlar

### 4.1 Login Sayfası (`/login`)

- Email + şifre formu
- "Giriş Yap" butonu
- Hata mesajları Türkçe gösterilecek
- Kayıt formu YOK (kullanıcılar admin tarafından Supabase'den eklenir)
- Başarılı girişte `/dashboard`'a yönlendirme

---

### 4.2 Dashboard — Fikir Board'u (`/dashboard`)

Ana ekran. İki bölüm var:

#### Üst Bar
- Sol: Logo + uygulama adı ("SaaS Fikir Motoru")
- Sağ: Kullanıcı adı + "Çıkış" butonu
- Sağ: "🔖 Arşivim" linki

#### İstatistik Kartları (4 adet, yatay sıra)
| Kart | İçerik |
|------|--------|
| Toplam Fikir | Bugün üretilen fikir sayısı |
| Yüksek Skor (80+) | Skoru 80 ve üzeri olan fikirler |
| Ort. Almanya Uyumu | Tüm fikirlerin Almanya uyum ortalaması (%) |
| Son Güncelleme | Fikirlerin son üretilme saati |

#### Kontrol Satırı
- Filtre butonları: `Tümü` / `Mikro SaaS` / `B2B` / `Mimarlık`
- Sıralama dropdown: `Skor ↓` / `En Kolay` / `Almanya Uyumu`
- Sağda: **"⚡ Fikirleri Getir"** butonu (tıklandığında Claude API çağrısı yapar)

#### Fikir Kartları Grid'i
Her kart şunları içerir:

```
┌─────────────────────────────────────┐
│ [Başlık]                    [SKOR]  │
│                                     │
│ Kısa açıklama (2 cümle)             │
│                                     │
│ [kategori] [tag1] [🇩🇪 %88]         │
│                                     │
│ Gelir    │ Zorluk  │ MVP Süresi     │
│ €2-5k/ay │ Orta    │ 3-4 hafta      │
│                                     │
│ Pazar Büyüklüğü: ~4.200 işletme    │
│                                     │
│ [🔖 Arşive Kaydet]                  │
└─────────────────────────────────────┘
```

**Kart renk kodlaması:**
- Skor 80+ → Yeşil vurgu
- Skor 60-79 → Sarı/turuncu vurgu
- Skor 60 altı → Kırmızı vurgu

**Karta tıklayınca:** Detay paneli (modal/drawer) açılır

---

### 4.3 Fikir Detay Paneli (Modal)

Karta tıklandığında açılır. Şunları içerir:

| Bölüm | İçerik |
|-------|--------|
| Başlık + Skor | Fikir adı ve skor badge |
| Metrikler | Gelir, MVP süresi, zorluk, Almanya uyumu, pazar büyüklüğü |
| Acı Modeli | Bu ürün hangi problemi çözüyor |
| Para Kazanma | Fiyatlandırma modeli, müşteri başı gelir |
| Gerekli Araçlar | Claude API, Vercel, Supabase vb. |
| MVP Adımları | 4-5 adımlık kurulum listesi |
| Riskler | 2-3 madde |
| Rakipler | Mevcut alternatiflerin kısa özeti |

Alt butonlar:
- **"🔖 Arşive Kaydet"** → Supabase'e kaydeder
- **"Kapat"** → Modalı kapatır

---

### 4.4 Arşiv Sayfası (`/arsiv`)

Kullanıcının kaydettiği fikirler burada listelenir.

- Aynı kart tasarımı kullanılır
- "Kaydedildi" badge'i gösterilir
- **"🗑 Arşivden Çıkar"** butonu (kaydı siler)
- Boşsa: "Henüz arşive fikir kaydetmediniz" mesajı

---

## 5. Claude API Entegrasyonu

### 5.1 Fikir Üretme Endpoint'i

**Route:** `POST /api/ideas/generate`  
**Tetikleyici:** "Fikirleri Getir" butonu veya Vercel Cron Job  
**Model:** `claude-sonnet-4-6`  
**Max tokens:** 4000

#### System Prompt:

```
Sen bir SaaS fikir analisti ve startup danışmanısın.
Almanya B2B pazarında çalışan bir AI ajansı için fikir üretiyorsun.

Görevin: Şu an trend olan, 2024-2025'te büyüyen, Almanya'daki orta/büyük 
şirketlere (Mittelstand) satılabilecek SaaS fikirleri üret ve analiz et.

ÖNEMLİ KURALLAR:
- Sadece JSON döndür, başka hiçbir şey yazma
- Markdown kod bloğu kullanma
- Gerçekçi ol, hype yapma
- Her fikir gerçekten uygulanabilir olmalı
- Pazar büyüklüğünü Almanya özelinde hesapla
```

#### User Prompt:

```
Almanya B2B pazarı için 6 adet trend SaaS fikri üret.
Dağılım: 2 mikro SaaS, 2 B2B araç, 2 mimarlık/gayrimenkul SaaS.
Özellikle Mittelstand şirketlerinin (50-500 çalışan) acılarına odaklan.
Sadece JSON array döndür.
```

#### Beklenen JSON Formatı:

```json
[
  {
    "id": "unique_string_id",
    "title": "Fikir başlığı (Türkçe)",
    "desc": "2 cümle açıklama (Türkçe)",
    "category": "mikro | b2b | mimarlik",
    "tags": ["tag1", "tag2", "tag3"],
    "score": 85,
    "revenue_potential": "€2-5k/ay",
    "difficulty": "Kolay | Orta | Zor",
    "time_to_mvp": "2-4 hafta",
    "germany_fit": 88,
    "market_size": "~4.200 işletme Almanya'da",
    "pain_model": "Hangi acıyı çözüyor (Türkçe)",
    "monetization": "Nasıl para kazanır, fiyat modeli (Türkçe)",
    "tools": ["Claude API", "Vercel", "Supabase"],
    "steps": [
      "Adım 1",
      "Adım 2",
      "Adım 3",
      "Adım 4"
    ],
    "risks": ["Risk 1", "Risk 2"],
    "competitors": "Mevcut rakipler ve fark (Türkçe)"
  }
]
```

### 5.2 Hata Yönetimi

- API yanıtı boşsa: "Fikir üretilemedi, tekrar dene" mesajı göster
- JSON parse hatası: Yanıt içinden `[...]` regex ile bul, tekrar parse et
- Rate limit: 30 saniye bekle, otomatik tekrar dene (1 kez)
- Network hatası: Kullanıcıya Türkçe hata mesajı göster

---

## 6. Veritabanı Şeması (Supabase)

### Tablo: `ideas`

```sql
CREATE TABLE ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT NOT NULL,           -- Claude'un ürettiği string ID
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('mikro', 'b2b', 'mimarlik')),
  tags TEXT[],
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  revenue_potential TEXT,
  difficulty TEXT CHECK (difficulty IN ('Kolay', 'Orta', 'Zor')),
  time_to_mvp TEXT,
  germany_fit INTEGER CHECK (germany_fit BETWEEN 0 AND 100),
  market_size TEXT,
  pain_model TEXT,
  monetization TEXT,
  tools TEXT[],
  steps TEXT[],
  risks TEXT[],
  competitors TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tablo: `saved_ideas`

```sql
CREATE TABLE saved_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, idea_id)             -- Aynı fikri 2 kez kaydedemez
);
```

### Row Level Security (RLS) Kuralları

```sql
-- ideas tablosu: herkes okuyabilir (login olmuş kullanıcılar)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Giriş yapmış kullanıcılar okuyabilir"
  ON ideas FOR SELECT
  USING (auth.role() = 'authenticated');

-- saved_ideas: kullanıcı sadece kendi kayıtlarını görür
ALTER TABLE saved_ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcı kendi kayıtlarını görür"
  ON saved_ideas FOR ALL
  USING (auth.uid() = user_id);
```

---

## 7. API Route'ları (Next.js)

| Method | Route | Açıklama |
|--------|-------|----------|
| POST | `/api/ideas/generate` | Claude API'ye istek atar, üretilen fikirleri DB'ye kaydeder, sonuçları döner |
| GET | `/api/ideas` | Son üretilen fikirleri DB'den çeker (son 24 saat) |
| POST | `/api/ideas/save` | Bir fikri kullanıcının arşivine kaydeder |
| DELETE | `/api/ideas/save/[id]` | Arşivden fikir çıkarır |
| GET | `/api/ideas/saved` | Kullanıcının arşivindeki fikirleri çeker |

---

## 8. Otomatik Günlük Fikir Üretimi (Vercel Cron)

**Dosya:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/ideas/generate",
      "schedule": "0 7 * * 1-5"
    }
  ]
}
```

Bu konfigürasyon her hafta içi sabah 07:00'de (UTC) otomatik fikir üretir.

**Önemli:** Cron job bir `CRON_SECRET` environment variable ile korunmalı.
Route içinde `Authorization: Bearer ${CRON_SECRET}` header'ı kontrol etmeli.

---

## 9. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Cron güvenliği
CRON_SECRET=random_secret_string

# App
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

---

## 10. Tasarım Rehberi

### Renk Paleti (Dark Theme)
```css
--bg: #0a0a0f          /* Ana arka plan */
--surface: #111118     /* Kart arka planı */
--surface2: #1a1a24    /* İkincil yüzey */
--border: #2a2a3a      /* Kenarlıklar */
--accent: #7c6aff      /* Ana vurgu (mor) */
--accent-green: #6affd4 /* Yeşil vurgu */
--accent-red: #ff6a6a  /* Kırmızı vurgu */
--accent-orange: #ffb86a /* Turuncu vurgu */
--text: #e8e8f0        /* Ana metin */
--muted: #6b6b80       /* İkincil metin */
```

### Tipografi
- **Başlıklar:** Syne (Google Fonts) — font-weight: 700/800
- **Gövde / Metrikler:** DM Mono (Google Fonts) — font-weight: 400

### Grid Sistemi
- Dashboard: `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))`
- Mobil: tek sütun
- Arkaplan: ince grid deseni (CSS linear-gradient ile)

### Animasyonlar
- Kart giriş animasyonu: `fadeInUp` (opacity 0→1, translateY 12px→0)
- Her kart 80ms gecikme ile sırayla girer
- Loading skeleton: shimmer animasyonu
- Hover: `translateY(-2px)` + box-shadow

---

## 11. Klasör Yapısı (Next.js App Router)

```
/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx        # Login sayfası
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Ana board
│   │   └── arsiv/
│   │       └── page.tsx        # Arşiv sayfası
│   ├── api/
│   │   └── ideas/
│   │       ├── generate/
│   │       │   └── route.ts    # Claude API çağrısı
│   │       ├── route.ts        # Fikirleri listele
│   │       ├── save/
│   │       │   └── route.ts    # Arşive kaydet
│   │       └── saved/
│   │           └── route.ts    # Arşivi getir
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── IdeaCard.tsx             # Fikir kartı
│   ├── IdeaDetailModal.tsx      # Detay modalı
│   ├── StatsBar.tsx             # İstatistik bar
│   ├── FilterBar.tsx            # Filtre + buton satırı
│   └── SkeletonCard.tsx         # Loading skeleton
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── anthropic.ts             # Claude API helper
│   └── types.ts                 # TypeScript tipleri
├── vercel.json                  # Cron job konfigürasyonu
└── .env.local                   # Environment variables
```

---

## 12. TypeScript Tipleri

```typescript
// lib/types.ts

export interface Idea {
  id: string;
  external_id: string;
  title: string;
  description: string;
  category: 'mikro' | 'b2b' | 'mimarlik';
  tags: string[];
  score: number;
  revenue_potential: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  time_to_mvp: string;
  germany_fit: number;
  market_size: string;
  pain_model: string;
  monetization: string;
  tools: string[];
  steps: string[];
  risks: string[];
  competitors: string;
  generated_at: string;
  isSaved?: boolean;  // Client-side computed
}

export interface SavedIdea {
  id: string;
  user_id: string;
  idea_id: string;
  saved_at: string;
  idea: Idea;
}
```

---

## 13. Önemli Notlar (Geliştirici İçin)

1. **Supabase Auth:** Kayıt formu yok. Kullanıcılar Supabase dashboard'undan manuel eklenir. Davet linki gönderilebilir.

2. **Claude API:** `/api/ideas/generate` route'u sadece sunucu tarafında çalışır. API key asla client'a gönderilmez.

3. **Fikir tekrarı:** Her "Fikirleri Getir" çağrısında yeni fikirler üretilir. Eski fikirler DB'de kalır. Kullanıcı her zaman son üretilen fikirleri görür (son 24 saat veya son üretim batch'i).

4. **Rate limiting:** Kullanıcı başına dakikada maksimum 3 "Fikirleri Getir" isteği. Supabase veya middleware ile kontrol edilebilir.

5. **Mobil:** Tamamen responsive olmalı. Kartlar mobilde tek sütun.

6. **Error boundary:** Tüm sayfalarda hata yakalama olmalı. Hata durumunda Türkçe mesaj göster, sayfayı çökertme.

---

## 14. MVP Dışında Kalan Özellikler (Sonraya)

Bu özellikler bu versiyona dahil DEĞİL:
- Ekip üyesi atama
- Fikre yorum ekleme
- CSV export
- Bildirim sistemi
- Almanya şirket lead arama
- İngilizce / Almanca dil desteği

---

## 15. Başarı Kriterleri

Uygulama şunları yapabiliyorsa tamamdır:

- [ ] Login ile güvenli giriş yapılabiliyor
- [ ] "Fikirleri Getir" butonuyla 6 fikir üretiliyor
- [ ] Her fikir kartında skor, Almanya uyumu, pazar büyüklüğü, MVP süresi görünüyor
- [ ] Karta tıklayınca detay modalı açılıyor
- [ ] "Arşive Kaydet" ile fikir kaydediliyor
- [ ] Arşiv sayfasında kayıtlı fikirler listeleniyor
- [ ] Sabah 07:00'de otomatik fikir üretimi çalışıyor
- [ ] Vercel'de yayınlanmış, URL üzerinden erişilebilir
