// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'all') {
    return attempts
  }

  if (filter === 'passed') {
    return attempts.filter(attempt => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter(attempt => attempt.passed === false)
  }

  return []
}

function renderAttempts(attempts) {
  const resultList = document.querySelector('#result-list')
  let html = ''

  attempts.forEach(attempt => {
    html += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        — ${attempt.score} из ${window.reportData.questionCount}
        (${attempt.percentage}%)
      </li>
    `
  })

  resultList.innerHTML = html
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  const resultCount = document.querySelector('#result-count')
  const resultList = document.querySelector('#result-list')

  form.addEventListener('submit', function(event) {
    event.preventDefault()

    const filter = select.value
    const attempts = selectAttempts(filter)

    renderAttempts(attempts)

    resultCount.textContent =
      `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
  })
}

startFilter()
