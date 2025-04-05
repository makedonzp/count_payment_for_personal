document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  calculateBtn.addEventListener('click', calculateSalary);

  function calculateSalary() {
    // Константы для расчета
    const BASE_SALARY = 30000;
    const DAY_RATE = 1363;
    const TAX_RATE = 0.13; // 13% НДФЛ

    // Получаем количество отработанных дней
    const workedDays = parseInt(document.getElementById('worked_days').value) || 0;

    // Рассчитываем окладную часть
    let salaryPart = 0;
    if (workedDays <= 22) {
      salaryPart = BASE_SALARY * (workedDays / 22);
    } else {
      salaryPart = BASE_SALARY + ((workedDays - 22) * DAY_RATE);
    }

    // Получаем доплату за стаж
    const experience10000 = document.getElementById('experience_10000').checked;
    const experience5000 = document.getElementById('experience_5000').checked;
    let experienceSum = 0;
    if (experience10000) experienceSum += 10000;
    if (experience5000) experienceSum += 5000;

    // Проценты для каждой категории
    const percentages = {
      'apparatus': { '120': 0.018, '100': 0.013, 'less100': 0.01 },
      'accessories': { '120': 0.08, '100': 0.06, 'less100': 0.04 },
      'services': { '120': 0.15, '100': 0.12, 'less100': 0.07 },
      'sp_vin_wave': { '120': 0.07, '100': 0.07, 'less100': 0.03 },
      'sp_my_country_super': { '120': 0.03, '100': 0.03, 'less100': 0.01 },
      'sp_my_country': { '120': 0.03, '100': 0.03, 'less100': 0.01 },
      'credits': { '120': 0.10, '100': 0.05, 'less100': 0.02 },
      'stock_ass': { '120': 0.10, '100': 0.05, 'less100': 0.02 }
    };

    // Рассчитываем бонусную часть
    let bonusPart = 0;

    // Обрабатываем каждую категорию
    for (const [category, rates] of Object.entries(percentages)) {
      const value = parseFloat(document.getElementById(category).value) || 0;
      const selectedOption = document.querySelector(`input[name="${category}_perf"]:checked`).value;
      const percent = rates[selectedOption];
      bonusPart += value * percent;
    }

    // Особый расчет для СП Моя Страна (учитывает 4 направления)
    const spMyCountryValue = parseFloat(document.getElementById('sp_my_country').value) || 0;
    const spMyCountryPerf = document.querySelector('input[name="sp_my_country_perf"]:checked').value;
    const spMyCountryPercent = percentages['sp_my_country'][spMyCountryPerf];

    // Умножаем на 4, так как эта категория объединяет 4 направления
    bonusPart += spMyCountryValue * spMyCountryPercent * 4;

    // Рассчитываем общую сумму выплат
    const totalPayout = salaryPart + bonusPart + experienceSum;

    // Рассчитываем сумму с учетом налогов (налог только с окладной части)
    const salaryAfterTax = salaryPart * (1 - TAX_RATE);
    const netPayout = salaryAfterTax + bonusPart + experienceSum;

    // Выводим результаты
    document.getElementById('bonus-result').textContent = `${bonusPart.toFixed(2)} руб.`;
    document.getElementById('total-result').textContent = `${totalPayout.toFixed(2)} руб.`;
    document.getElementById('net-result').textContent = `${netPayout.toFixed(2)} руб.`;
  }
});
