import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface QuizItem {
  id: number;
  title: string;
  question: string;
  options: { id: string; label: string; isCorrect: boolean }[];
  correctFeedback: string;
  wrongFeedback: string;
}

const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    title: 'Soru 1 (Kısa Çizgi)',
    question: 'Aşağıdaki cümlelerin hangisinde kısa çizgi (-) doğru kullanılmıştır?',
    options: [
      {
        id: 'A',
        label: 'A) İki ülke arasında 2020 - 2024 yılları kapsayan yeni bir ticaret anlaşması imzalandı.',
        isCorrect: false,
      },
      {
        id: 'B',
        label: 'B) Kütüphaneden kapsamlı bir Türkçe-Fransızca sözlük aldım.',
        isCorrect: true,
      },
      {
        id: 'C',
        label: 'C) Mahalledeki eski ev - ler sırayla restore edildi.',
        isCorrect: false,
      },
    ],
    correctFeedback:
      'Doğru! (B seçeneği) İki dil, kavram veya yer arasındaki ilişkilerde kısa çizgi kelimelerin arasına boşluk bırakılmadan konur.',
    wrongFeedback:
      'Tekrar bakalım: Doğru cevap B seçeneğidir. Sayı aralıklarında (2020-2024) ve kök-ek arasında boşluk bırakılmaz; iki dil arasında (Türkçe-Fransızca) ise kısa çizgi bitişik yazılır.',
  },
  {
    id: 2,
    title: 'Soru 2 (Ara Sözler)',
    question: 'Aşağıdaki cümlelerin hangisinde ara sözü ayırmak için kısa çizgi (-) kuralına uygun kullanılmıştır?',
    options: [
      {
        id: 'A',
        label: 'A) Küçük bir sürü -dört inekle birkaç keçi- uzaktan köye doğru göründü.',
        isCorrect: true,
      },
      {
        id: 'B',
        label: 'B) Küçük bir sürü (dört inekle - birkaç keçi) uzaktan köye doğru göründü.',
        isCorrect: false,
      },
      {
        id: 'C',
        label: 'C) Küçük bir sürü - dört inekle birkaç keçi uzaktan köye doğru göründü.',
        isCorrect: false,
      },
    ],
    correctFeedback:
      'Harika! (A seçeneği) Cümle içindeki ara sözlerin veya ara cümlelerin hem başına hem sonuna kısa çizgi konur ve bitişik yazılır.',
    wrongFeedback:
      'Tekrar bakalım: Doğru cevap A seçeneğidir. TDK kuralına göre ara sözlerin sadece başında değil, hem başında hem sonunda kısa çizgi bulunmalı ve kelimelere bitişik olmalıdır.',
  },
  {
    id: 3,
    title: 'Soru 3 (Yay Ayraç)',
    question: 'Aşağıdaki cümlelerin hangisinde yay ayraç ( ) doğru görevinde kullanılmıştır?',
    options: [
      {
        id: 'A',
        label: 'A) İhtiyar (Yavaşça ayağa kalkarak): — Hoş geldiniz evlatlarım, dedi.',
        isCorrect: true,
      },
      {
        id: 'B',
        label: 'B) Bu yaz Ankara (İzmir) otoyolunda kapsamlı yol çalışması yapıldı.',
        isCorrect: false,
      },
      {
        id: 'C',
        label: 'C) Ünlü yazarımız 1914 (1950) yılları arasında yaşamıştır.',
        isCorrect: false,
      },
    ],
    correctFeedback:
      'Mükemmel! (A seçeneği) Tiyatro ve senaryo metinlerinde konuşanın hareketlerini, durumunu ve tavrını göstermek için yay ayraç kullanılır.',
    wrongFeedback:
      'Tekrar bakalım: Doğru cevap A seçeneğidir. İki şehir arasında (Ankara-İzmir) ve tarih aralıklarında (1914-1950) yay ayraç değil, kısa çizgi (-) kullanılmalıdır.',
  },
];

export const QuizGame: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});

  const currentQ = QUIZ_QUESTIONS[currentQIndex];
  const selectedOptionId = answers[currentQ.id] || null;

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (selectedOptionId !== null) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));

    if (isCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#d85b6a', '#8e2436', '#f6edf0'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetCurrent = () => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: null }));
  };

  const selectedOption = currentQ.options.find((o) => o.id === selectedOptionId);
  const isAnswered = selectedOptionId !== null;
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="game">
      {/* Question Selector Tabs */}
      <div
        className="quiz-tabs"
        role="tablist"
        style={{ display: 'flex', gap: '8px', marginBottom: '1.2rem', flexWrap: 'wrap' }}
      >
        {QUIZ_QUESTIONS.map((q, idx) => {
          const ans = answers[q.id];
          const isQAnswered = Boolean(ans);
          const isQCorrect = isQAnswered && q.options.find((o) => o.id === ans)?.isCorrect;
          return (
            <button
              key={q.id}
              type="button"
              className={`quiz-tab-btn ${idx === currentQIndex ? 'active' : ''}`}
              onClick={() => setCurrentQIndex(idx)}
              style={{
                fontSize: '0.84rem',
                padding: '7px 15px',
                borderRadius: '6px',
                background:
                  idx === currentQIndex ? 'rgba(216,91,106,0.35)' : 'rgba(255,255,255,0.08)',
                color: idx === currentQIndex ? '#f6edf0' : '#cbb9be',
                border:
                  idx === currentQIndex ? '1px solid #d85b6a' : '1px solid rgba(216,91,106,0.25)',
                boxShadow: 'none',
              }}
            >
              {q.title} {isQAnswered ? (isQCorrect ? '✓' : '✗') : ''}
            </button>
          );
        })}
      </div>

      <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>{currentQ.question}</h3>
      <div className="choices" id="quizChoices" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentQ.options.map((opt) => {
          let btnClass = '';
          if (isAnswered) {
            if (opt.id === selectedOptionId) {
              btnClass = opt.isCorrect ? 'correct' : 'wrong';
            } else if (opt.isCorrect) {
              btnClass = 'correct';
            }
          }
          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswered}
              className={btnClass}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              style={{ textAlign: 'left', width: '100%', lineHeight: '1.45' }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <p className="feedback" id="quizFeedback" style={{ fontSize: '1.05rem', lineHeight: '1.45' }}>
        {isAnswered && (isCorrect ? currentQ.correctFeedback : currentQ.wrongFeedback)}
      </p>

      {isAnswered && (
        <div style={{ display: 'flex', gap: '10px', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          <button type="button" className="game-reset-btn" onClick={handleResetCurrent}>
            ↺ Soruyu Yeniden Çöz
          </button>
          {currentQIndex < QUIZ_QUESTIONS.length - 1 && (
            <button
              type="button"
              className="game-reset-btn"
              style={{ background: 'rgba(216,91,106,0.4)', borderColor: '#d85b6a' }}
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
            >
              Sonraki Soru →
            </button>
          )}
        </div>
      )}
    </div>
  );
};
