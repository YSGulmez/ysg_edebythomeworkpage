import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SortSentence } from '../types';

const INITIAL_SENTENCES: SortSentence[] = [
  {
    id: 's1',
    text: 'Eski dostum -onu hiç unutamam- dün bizi aradı.',
    type: 'dash',
    ruleName: 'Ara sözleri ayırma',
    explanation: 'Cümledeki ara sözün (-onu hiç unutamam-) iki ucuna kısa çizgi konur.',
  },
  {
    id: 's2',
    text: 'İhtiyar (Yavaşça ayağa kalkarak) söze başladı.',
    type: 'paren',
    ruleName: 'Tiyatroda hareket ve tavır',
    explanation: 'Tiyatro eserinde oyuncunun hareketi (Yavaşça ayağa kalkarak) yay ayraç içinde gösterilir.',
  },
  {
    id: 's3',
    text: '1919-1922 yılları arasında Millî Mücadele yaşandı.',
    type: 'dash',
    ruleName: 'Tarih aralığı belirtme',
    explanation: 'Başlangıç ve bitiş tarihleri arasında (1919-1922) kısa çizgi kullanılır.',
  },
  {
    id: 's4',
    text: 'Shakespeare (Şekspir) dünya edebiyatının devidir.',
    type: 'paren',
    ruleName: 'Yabancı sözcük okunuşu',
    explanation: 'Yabancı bir ismin Türkçe okunuşu (Şekspir) yay ayraç içinde belirtilir.',
  },
  {
    id: 's5',
    text: 'Dil bilgisinde "yaz-" ve "oku-" fiil kökleridir.',
    type: 'dash',
    ruleName: 'Fiil köklerini gösterme',
    explanation: 'Mastar eki (-mek/-mak) yerine fiil köklerinin (yaz-, oku-) sonuna kısa çizgi konur.',
  },
  {
    id: 's6',
    text: 'Fuzuli 1496 (?) yılında doğmuştur.',
    type: 'paren',
    ruleName: 'Şüphe bildiren soru işareti',
    explanation: 'Bilginin kesin olmadığını veya şüpheyle karşılandığını göstermek için soru işareti yay ayraç (?) içine alınır.',
  },
];

export const SortingGame: React.FC = () => {
  const [unplaced, setUnplaced] = useState<SortSentence[]>(INITIAL_SENTENCES);
  const [dashItems, setDashItems] = useState<SortSentence[]>([]);
  const [parenItems, setParenItems] = useState<SortSentence[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [dragOverBox, setDragOverBox] = useState<'dash' | 'paren' | null>(null);

  const placeItem = (targetBox: 'dash' | 'paren', itemToPlace: SortSentence) => {
    if (itemToPlace.type === targetBox) {
      setUnplaced((prev) => prev.filter((s) => s.id !== itemToPlace.id));
      if (targetBox === 'dash') {
        setDashItems((prev) => [...prev, itemToPlace]);
      } else {
        setParenItems((prev) => [...prev, itemToPlace]);
      }
      setFeedback(`Doğru! ${itemToPlace.explanation || 'Tebrikler.'}`);
      setSelectedId(null);

      // Check if all are now placed
      if (unplaced.length === 1) {
        setFeedback('Mükemmel! 6 örneğin tamamını kurallarına göre doğru kutulara yerleştirdin! 🎉');
        try {
          confetti({
            particleCount: 65,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#d85b6a', '#8e2436', '#f6edf0'],
          });
        } catch {
          // ignore
        }
      }
    } else {
      if (itemToPlace.type === 'dash') {
        setFeedback(
          `Dikkat: "${itemToPlace.text}" cümlesi Kısa Çizgi (-) kuralıyla ilgilidir. Lütfen Kısa Çizgi kutusuna yerleştirin.`
        );
      } else {
        setFeedback(
          `Dikkat: "${itemToPlace.text}" cümlesi Yay Ayraç ( ) kuralıyla ilgilidir. Lütfen Yay Ayraç kutusuna yerleştirin.`
        );
      }
      setSelectedId(null);
    }
  };

  const handleSentenceClick = (s: SortSentence) => {
    if (selectedId === s.id) {
      setSelectedId(null);
    } else {
      setSelectedId(s.id);
    }
  };

  const handleBoxClick = (boxType: 'dash' | 'paren') => {
    if (!selectedId) return;
    const item = unplaced.find((s) => s.id === selectedId);
    if (item) {
      placeItem(boxType, item);
    }
  };

  const handleDragStart = (e: React.DragEvent, s: SortSentence) => {
    e.dataTransfer.setData('text/plain', s.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, boxType: 'dash' | 'paren') => {
    e.preventDefault();
    setDragOverBox(boxType);
  };

  const handleDragLeave = () => {
    setDragOverBox(null);
  };

  const handleDrop = (e: React.DragEvent, boxType: 'dash' | 'paren') => {
    e.preventDefault();
    setDragOverBox(null);
    const id = e.dataTransfer.getData('text/plain');
    const item = unplaced.find((s) => s.id === id);
    if (item) {
      placeItem(boxType, item);
    }
  };

  const handleReset = () => {
    setUnplaced(INITIAL_SENTENCES);
    setDashItems([]);
    setParenItems([]);
    setSelectedId(null);
    setFeedback('');
  };

  return (
    <div className="game">
      <p style={{ margin: '0.2rem 0 1.2rem', fontSize: '1.08rem' }}>
        Aşağıdaki cümleleri sürükleyip ait oldukları noktalama işareti kutusuna bırakın veya cümleye
        tıklayıp ardından kutuya dokunun:
      </p>

      {/* Available unplaced sentences */}
      <div
        id="sentences"
        style={{
          minHeight: '52px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '1rem',
        }}
      >
        {unplaced.map((s) => (
          <span
            key={s.id}
            className={`sentence ${selectedId === s.id ? 'selected' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, s)}
            onClick={() => handleSentenceClick(s)}
            role="button"
            tabIndex={0}
            title="Seçmek için tıkla veya sürükle"
            style={{ fontSize: '0.96rem', padding: '9px 14px' }}
          >
            {s.text}
          </span>
        ))}
        {unplaced.length === 0 && (
          <span
            style={{
              color: '#d28b96',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              padding: '6px 0',
              fontWeight: 600,
            }}
          >
            Tüm 6 kural örneği başarıyla doğru kutulara yerleştirildi!
          </span>
        )}
      </div>

      <div className="drop-zone">
        {/* Dash Box */}
        <div
          className={`drop ${dragOverBox === 'dash' ? 'drag-over' : ''}`}
          data-drop="dash"
          onClick={() => handleBoxClick('dash')}
          onDragOver={(e) => handleDragOver(e, 'dash')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'dash')}
          role="region"
          aria-label="Kısa Çizgi Bırakma Kutusu"
        >
          <strong style={{ fontSize: '0.86rem', color: '#f0b7c1' }}>
            KISA ÇİZGİ (-) · Ara söz, kök, tarih aralığı
          </strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {dashItems.map((item) => (
              <span
                key={item.id}
                className="sentence placed"
                style={{ cursor: 'default', fontSize: '0.94rem' }}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Paren Box */}
        <div
          className={`drop ${dragOverBox === 'paren' ? 'drag-over' : ''}`}
          data-drop="paren"
          onClick={() => handleBoxClick('paren')}
          onDragOver={(e) => handleDragOver(e, 'paren')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'paren')}
          role="region"
          aria-label="Yay Ayraç Bırakma Kutusu"
        >
          <strong style={{ fontSize: '0.86rem', color: '#f0b7c1' }}>
            YAY AYRAÇ ( ) · Tiyatro, okunuş, şüphe (?)
          </strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {parenItems.map((item) => (
              <span
                key={item.id}
                className="sentence placed"
                style={{ cursor: 'default', fontSize: '0.94rem' }}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p
        className="feedback"
        id="dropFeedback"
        style={{ minHeight: '1.5em', fontSize: '1.02rem', lineHeight: '1.45' }}
      >
        {feedback}
      </p>

      {(unplaced.length < INITIAL_SENTENCES.length || feedback) && (
        <button type="button" className="game-reset-btn" onClick={handleReset}>
          ↺ Oyunu Sıfırla
        </button>
      )}
    </div>
  );
};
