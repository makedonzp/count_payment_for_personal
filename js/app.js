document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  calculateBtn.addEventListener('click', calculateSalary);

  function calculateSalary() {
    const BASE_SALARY = 30000;
    const DAY_RATE = 1363;
    const TAX_RATE = 0.13;

    // Окладная часть (без изменений)
    const workedDays = parseInt(document.getElementById('worked_days').value) || 0;
    let salaryPart = workedDays <= 22
        ? BASE_SALARY * (workedDays / 22)
        : BASE_SALARY + ((workedDays - 22) * DAY_RATE);

    // Доплата за стаж (без изменений)
    let experienceSum = 0;
    if (document.getElementById('experience_10000').checked) experienceSum += 10000;
    if (document.getElementById('experience_5000').checked) experienceSum += 5000;

    // Проценты для категорий
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

    // Расчет бонусов (теперь без дублирования)
    let bonusPart = 0;
    for (const [category, rates] of Object.entries(percentages)) {
      const value = parseFloat(document.getElementById(category).value) || 0;
      const selectedOption = document.querySelector(`input[name="${category}_perf"]:checked`).value;
      bonusPart += value * rates[selectedOption];
    }

    // Итоговые расчеты (без изменений)
    const totalPayout = salaryPart + bonusPart + experienceSum;
    const netPayout = (salaryPart * (1 - TAX_RATE)) + bonusPart + experienceSum;

    // Вывод результатов
    document.getElementById('bonus-result').textContent = `${bonusPart.toFixed(2)} руб.`;
    document.getElementById('total-result').textContent = `${totalPayout.toFixed(2)} руб.`;
    document.getElementById('net-result').textContent = `${netPayout.toFixed(2)} руб.`;
  }
});
