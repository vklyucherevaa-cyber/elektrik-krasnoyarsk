export default function PrivacyPage() {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <a
            href="/"
            className="text-sm font-bold text-slate-500 hover:text-slate-900"
          >
            ← Вернуться на сайт
          </a>
  
          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl">
            Политика обработки персональных данных
          </h1>
  
          <p className="mt-5 text-sm leading-7 text-slate-500">
            Настоящая политика определяет порядок обработки и защиты
            персональных данных, которые предоставляются пользователями сайта.
          </p>
  
          <div className="mt-12 space-y-10 text-sm leading-7 text-slate-600">
            <section>
              <h2 className="text-xl font-black text-slate-950">
                1. Общие положения
              </h2>
  
              <p className="mt-3">
                Оператор обрабатывает персональные данные пользователей,
                предоставленные через формы сайта, исключительно в целях
                обработки обращений, обратной связи и связи с пользователем
                по вопросу оказания услуг.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-slate-950">
                2. Какие данные обрабатываются
              </h2>
  
              <p className="mt-3">
                Могут обрабатываться имя, номер телефона, содержание обращения,
                а также сведения, которые пользователь добровольно указывает
                в комментарии или получает при использовании калькулятора.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-slate-950">
                3. Цели обработки
              </h2>
  
              <p className="mt-3">
                Данные используются для связи с пользователем, рассмотрения
                заявки, уточнения параметров заказа и подготовки ответа
                на обращение.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-slate-950">
                4. Порядок обработки
              </h2>
  
              <p className="mt-3">
                Обработка может осуществляться автоматизированным способом.
                Данные не используются для целей, несовместимых с указанными
                в настоящей политике.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-slate-950">
                5. Срок хранения
              </h2>
  
              <p className="mt-3">
                Персональные данные хранятся не дольше, чем это необходимо для
                достижения целей обработки, если более длительный срок хранения
                не установлен законодательством Российской Федерации.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-slate-950">
                6. Отзыв согласия
              </h2>
  
              <p className="mt-3">
                Пользователь вправе отозвать согласие на обработку персональных
                данных в порядке, предусмотренном законодательством Российской
                Федерации.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-slate-950">
                7. Контакты
              </h2>
  
              <p className="mt-3">
                Телефон:{' '}
                <a
                  href="tel:+79994461423"
                  className="font-bold underline"
                >
                  +7 999 444-14-23
                </a>
              </p>
  
              <p>
                Email:{' '}
                <a
                  href="mailto:rodionklyucherev@mail.ru"
                  className="font-bold underline"
                >
                  rodionklyucherev@mail.ru
                </a>
              </p>
  
              <p>Зона работы: Красноярск и пригород.</p>
            </section>
          </div>
  
          <div className="mt-14 rounded-3xl bg-orange-50 p-5 text-sm leading-6 text-slate-600">
            Внимание: перед публикацией сайта необходимо указать в настоящей
            политике реальные сведения об операторе персональных данных и
            проверить фактический способ хранения/передачи заявок. Политика
            должна соответствовать реальным процессам обработки данных.
          </div>
        </div>
      </main>
    )
  }