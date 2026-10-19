import React from 'react';
import { QuizGame } from './QuizGame';
import { SortingGame } from './SortingGame';

interface SlideContentProps {
  index: number;
  direction?: 'next' | 'prev';
}

export const TOTAL_SLIDES = 10;

export const SlideContent: React.FC<SlideContentProps> = ({ index, direction = 'next' }) => {
  const slideClass = `slide active ${direction === 'next' ? 'slide-enter-next' : 'slide-enter-prev'}`;

  switch (index) {
    case 0:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">Türk dili ve edebiyatı · Noktalama İşaretleri</p>
          <div className="hero-layout">
            <div>
              <div className="title-mark">
                - <span>( )</span>
              </div>
              <h1>
                Kısa çizgi
                <br />
                ve yay ayraç
              </h1>
              <p className="lead">
                Kısa çizgi unsurlar arasında bağ kurar, heceleri ve ara sözleri ayırır.
                Yay ayraç ise cümleye ek açıklama, tiyatro durumları, alay ve şüphe anlamı katar.
              </p>
              <div className="clarity-strip">
                <span className="clarity-chip">
                  <b>-</b> bağ kurar & ara sözü ayırır
                </span>
                <span className="clarity-chip">
                  <b>( )</b> ek bilgi, tiyatro & şüphe belirtir
                </span>
              </div>
            </div>
            <div className="hero-art">
              <span className="art-label">TDK KURALLARI</span>
              <span className="art-symbol">- ( )</span>
              <span className="art-label">TÜM GÖREVLER · 2 ETKİLEŞİMLİ OYUN</span>
            </div>
          </div>
        </section>
      );

    case 1:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">01 — Kısa çizgi (-)</p>
          <h2>
            <span className="symbol">-</span> Kısa çizgi ne anlatır?
          </h2>
          <p className="lead">
            Kısa çizgi (<b>-</b>), iki kelimeyi, sayıyı veya kavramı birbirine bağlar. Cümledeki
            <strong> ara söz ve ara cümlelerin başına ve sonuna</strong> konarak onları ana cümleden
            ayırır. Dil bilgisinde ise kök, ek ve heceleri göstermek için kullanılır.
          </p>
          <div className="example">
            <span className="example-label">Örnek 1 · İki Kavram Arasında</span>
            <span className="highlight">Türkçe-İngilizce Sözlük &nbsp;·&nbsp; Ankara-İstanbul Treni</span>
            <span className="example-note">
              İki dil, şehir veya alan arasındaki bağı ve ortaklığı ifade eder.
            </span>
          </div>
          <div className="example">
            <span className="example-label">Örnek 2 · Ara Sözleri Ayırma (Önemli!)</span>
            <span className="highlight">Eski dostum -onu hiç unutamam- dün ansızın aradı.</span>
            <span className="example-note">
              Cümle içindeki ara sözün başına ve sonuna boşluk bırakılmadan kısa çizgi getirilir.
            </span>
          </div>
        </section>
      );

    case 2:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">02 — Kısa çizginin tüm görevleri</p>
          <h2>Kısa çizginin kullanıldığı yerler (TDK)</h2>
          <div className="rule-grid">
            <article className="card">
              <span className="number">01</span>
              <h3>Ara söz ve ara cümlelerde</h3>
              <p>
                Cümle içindeki ara sözlerin veya ara cümlelerin başına ve sonuna konur.
                <span className="example-line">Küçük bir sürü -dört inekle birkaç keçi- göründü.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">02</span>
              <h3>İki sözcük / kavram arasında</h3>
              <p>
                İki yer, dil veya kavram arasında “ve, ile, ila, arasında” anlamı katar.
                <span className="example-line">Türkçe-Almanca &nbsp;·&nbsp; Beşiktaş-Fenerbahçe</span>
              </p>
            </article>
            <article className="card">
              <span className="number">03</span>
              <h3>Sayı ve tarih aralıklarında</h3>
              <p>
                Başlangıç ve bitişi göstermek için sayılar arasına gelir (boşluksuz).
                <span className="example-line">1914-1918 &nbsp;·&nbsp; 09.00-12.00 &nbsp;·&nbsp; 15-20 kişi</span>
              </p>
            </article>
            <article className="card">
              <span className="number">04</span>
              <h3>Kök, ek ve fiil gövdelerinde</h3>
              <p>
                Ekleri ayırmada ve mastar (-mek) yerine fiil köklerini göstermede kullanılır.
                <span className="example-line">yaz- &nbsp;·&nbsp; gör- &nbsp;·&nbsp; kitap-lık &nbsp;·&nbsp; -da</span>
              </p>
            </article>
            <article className="card">
              <span className="number">05</span>
              <h3>Heceleri ayırmada & satır sonunda</h3>
              <p>
                Kelimelerin hecelenişinde ve satıra sığmayan sözcüklerin bölünmesinde kullanılır.
                <span className="example-line">öğ-ren-ci &nbsp;·&nbsp; a-raş-tır-ma &nbsp;·&nbsp; ede-bi-yat</span>
              </p>
            </article>
            <article className="card">
              <span className="number">06</span>
              <h3>Matematik ve derecelerde</h3>
              <p>
                Matematikte çıkarma işareti ve sıfırdan küçük eksi dereceleri belirtir.
                <span className="example-line">50 - 20 = 30 &nbsp;·&nbsp; Sıcaklık -5 °C'ye düştü</span>
              </p>
            </article>
          </div>
        </section>
      );

    case 3:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">Mini oyun 01 · Test Et</p>
          <h2>Doğru kullanımı yakala</h2>
          <QuizGame />
        </section>
      );

    case 4:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">Kısa tekrar — Karıştırılan örnekler</p>
          <h2>Doğrusu nasıl yazılır?</h2>
          <p className="lead">
            Sınavlarda ve yazı dilinde en çok karıştırılan 4 kuralı hatırla:
          </p>
          <div className="rule-grid">
            <article className="card">
              <span className="number">01</span>
              <h3>Ara sözlerde çift çizgi</h3>
              <p>
                <b>Bu şehir -çocukluğumun geçtiği yer- çok değişmiş.</b>
                <span className="example-line">Ara sözün hem önünde hem arkasında kısa çizgi bulunur.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">02</span>
              <h3>Arada boşluk bırakılmaz</h3>
              <p>
                <b>Doğru: Ankara-İzmir yolu</b>
                <span className="example-line">Yanlış: Ankara - İzmir yolu (Kısa çizgide boşluk olmaz).</span>
              </p>
            </article>
            <article className="card">
              <span className="number">03</span>
              <h3>Tarih parantez içinde</h3>
              <p>
                <b>Orhan Veli (1914-1950)</b>
                <span className="example-line">Kısa çizgi yılları bağlar, yay ayraç ise cümleye açıklar.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">04</span>
              <h3>Fiil kökünde mastar eki yerine</h3>
              <p>
                <b>oku-, yaz-, gel-</b>
                <span className="example-line">Kısa çizgi, "okumak, yazmak" mastar anlamını karşılar.</span>
              </p>
            </article>
          </div>
        </section>
      );

    case 5:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">03 — Yay ayraç ( )</p>
          <h2>
            <span className="symbol">( )</span> Yay ayraç ne anlatır?
          </h2>
          <p className="lead">
            Yay ayraç (parantez), cümlenin yapısıyla doğrudan ilgili olmayan ek açıklamaları,
            tiyatro eserlerindeki oyuncu hareketlerini, alıntı kaynaklarını, şüphe ve kinaye
            anlamlarını metne eklemek için kullanılır. Parantez içindeki kısım çıkarıldığında cümlenin
            ana anlamı bozulmaz.
          </p>
          <div className="example">
            <span className="example-label">Örnek 1 · Ek Açıklama & Yaşam Yılları</span>
            Yahya Kemal Beyatlı <span className="highlight">(1884-1958)</span>, Türk şiirinin zirve adlarındandır.
            <span className="example-note">Tarih bilgisi cümleye ek açıklama olarak verilmiştir.</span>
          </div>
          <div className="example">
            <span className="example-label">Örnek 2 · Tiyatroda Durum / Hareket Bildirme</span>
            <span className="highlight">İhtiyar (Yavaşça ayağa kalkarak):</span> Hoş geldiniz evlatlarım.
            <span className="example-note">Oyuncunun sahnede yapacağı jest, tavır ve hareket yay ayraçla aktarılır.</span>
          </div>
        </section>
      );

    case 6:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">04 — Yay ayracın tüm görevleri</p>
          <h2>Yay ayracın kullanıldığı yerler (TDK)</h2>
          <div className="rule-grid">
            <article className="card">
              <span className="number">01</span>
              <h3>Cümleye ek açıklama katma</h3>
              <p>
                Cümlenin anlamını tamamlayan veya bir sözcüğün eş anlamlısını veren açıklamalar.
                <span className="example-line">Dilimizde yalınlık (sadelik) büyük bir erdemdir.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">02</span>
              <h3>Tiyatro ve senaryo metinlerinde</h3>
              <p>
                Konuşanın hareketlerini, durumunu ve tavrını göstermek için kullanılır.
                <span className="example-line">Kaymakam (Gözlüğünü çıkararak): Anlat bakalım.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">03</span>
              <h3>Doğum, ölüm ve dönem bilgisi</h3>
              <p>
                Bir yazar veya tarihi olayın zaman sınırlarını göstermek için kullanılır.
                <span className="example-line">Yunus Emre (1240?-1320), Tanzimat Dönemi (1860-1896)</span>
              </p>
            </article>
            <article className="card">
              <span className="number">04</span>
              <h3>Şüphe bildiren soru işaretiyle (?)</h3>
              <p>
                Bir bilginin kesin olmadığını veya şüpheyle karşılandığını belirtir.
                <span className="example-line">1496 (?) yılında doğan Fuzuli... &nbsp;·&nbsp; Ankara'dan Konya'ya 1 saatte (?) gitmiş.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">05</span>
              <h3>Alay / kinaye bildiren ünlemle (!)</h3>
              <p>
                Bir söze alay, küçümseme veya kinaye anlamı katmak için yay ayraç içinde ünlem konur.
                <span className="example-line">Adamın çok zeki (!) olduğu her hâlinden belliydi.</span>
              </p>
            </article>
            <article className="card">
              <span className="number">06</span>
              <h3>Alıntı kaynağı & yabancı okunuş</h3>
              <p>
                Yazar, eser, çevirmen adı veya yabancı sözcüklerin Türkçe okunuşunda kullanılır.
                <span className="example-line">Küçük Prens (Çev. Cemal Süreya) &nbsp;·&nbsp; Shakespeare (Şekspir)</span>
              </p>
            </article>
          </div>
        </section>
      );

    case 7:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">Birlikte düşünelim · Karşılaştırma</p>
          <h2>Karıştırmamak için: İki İşaretin Ayrımı</h2>
          <div className="compare">
            <div>
              <div className="big">-</div>
              <h3>Kısa çizgi (-)</h3>
              <p>
                <b>• Ara Sözlerde:</b> Cümle akışında ara sözün hem başına hem sonuna konur:<br />
                <em>"Kardeşim -onu çok özlemiştim- kapıda belirdi."</em><br /><br />
                <b>• Bağlantı Kurar:</b> İki kavramı, şehri veya tarih aralığını birleştirir:<br />
                <em>"Türkçe-Fransızca sözlük", "1919-1923"</em><br /><br />
                <b>• Dilbilgisi:</b> Heceleri, kök ve ekleri, fiil mastarını gösterir.
              </p>
            </div>
            <div>
              <div className="big">( )</div>
              <h3>Yay ayraç ( )</h3>
              <p>
                <b>• Ek Bilgi ve Kaynak:</b> Cümlenin dışındaki yan açıklamayı içine alır:<br />
                <em>"Tanzimat Dönemi (1860-1896)", "Yalınlık (sadelik)"</em><br /><br />
                <b>• Tiyatro & Durum:</b> Sahne jest ve hareketlerini belirtir:<br />
                <em>"İhtiyar (Hüzünle gülümseyerek): Geçti artık."</em><br /><br />
                <b>• Şüphe & Alay:</b> Soru işaretiyle <em>(?)</em> şüphe, ünlemle <em>(!)</em> kinaye katar.
              </p>
            </div>
          </div>
        </section>
      );

    case 8:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">Mini oyun 02 · Uygula</p>
          <h2>Yerine yerleştir (Tüm Özellikler)</h2>
          <SortingGame />
        </section>
      );

    case 9:
    default:
      return (
        <section className={slideClass} key={index}>
          <p className="eyebrow">Kapanış · Özet Formül</p>
          <h2>Dersi kapatırken</h2>
          <p className="takeaway">
            <em>Kısa çizgi (-)</em>: İki unsur arasında bağ kurar, <strong>ara sözlerin iki yanına</strong> konur, kök-ek ve heceleri ayırır.<br />
            <em>Yay ayraç ( )</em>: Cümleye <strong>ek açıklama</strong> katar, tiyatroda hareketleri bildirir, <strong>şüphe (?)</strong> ve <strong>alay (!)</strong> katar.
          </p>
          <div className="clarity-strip" style={{ marginTop: '1.5rem' }}>
            <span className="clarity-chip"><b>- ara söz -</b> başına ve sonuna kısa çizgi</span>
            <span className="clarity-chip"><b>(tiyatro tavrı)</b> yay ayraç içinde</span>
            <span className="clarity-chip"><b>1496 (?)</b> şüphe parantezde</span>
            <span className="clarity-chip"><b>zeki (!)</b> alay parantezde</span>
          </div>
        </section>
      );
  }
};
