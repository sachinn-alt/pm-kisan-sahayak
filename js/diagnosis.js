export function diagnosisView(farmer) {
  if (!farmer.issue) return `<section class="screen standard-screen"><button class="back" data-route="dashboard">← Back</button><div class="page-heading"><div>✓</div><h1>Everything looks good</h1><p>There are no payment issues in your PM-KISAN profile right now.</p></div><button class="primary-btn" data-route="chat">💬 Ask Sahayak AI</button></section>`;
  const issue = farmer.issueDetails;
  return `<section class="screen standard-screen diagnosis-screen">
    <button class="back" data-route="dashboard">← Back to dashboard</button>
    <div class="page-heading"><div>🔍</div><h1>Payment diagnosis</h1><p>We found why your payment needs attention.</p></div>
    <article class="issue-card"><span class="issue-badge">ISSUE FOUND · ${issue.failedInstallment}rd INSTALLMENT</span><h2>${issue.title}</h2><p>${issue.explain}</p></article>
    <h2 class="section-title">✅ How to fix this</h2>
    <div class="resolution-list">${issue.resolutionOptions.map((option, index) => `<details class="resolution-card" ${index === 0 ? 'open' : ''}><summary><span>${option.icon}</span><div><h3>${option.title}</h3><small>${option.time} · ${option.difficulty}</small></div><b>⌄</b></summary><ol>${option.steps.map(step => `<li>${step}</li>`).join('')}</ol></details>`).join('')}</div>
    <article class="documents-card"><h2>📋 Documents needed</h2>${issue.documents.map(item => `<p>☑️ ${item}</p>`).join('')}</article>
    <button class="primary-btn" data-route="chat">💬 Still confused? Talk to Sahayak AI</button>
  </section>`;
}
