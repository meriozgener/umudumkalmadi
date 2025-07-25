// teacher-dashboard.js

// Öğrenci raporlarını yükle
async function loadStudentReports() {
  const { data, error } = await supabase
    .from('student_reports')
    .select('name, course, grade');

  const reportsTableBody = document.getElementById('reportsTableBody');
  reportsTableBody.innerHTML = '';

  if (error) {
    console.error('Rapor yüklenirken hata:', error);
    return;
  }

  data.forEach(report => {
    const row = `
      <tr>
        <td>${report.name}</td>
        <td>${report.course}</td>
        <td>${report.grade}</td>
        <td><button onclick="sendMessage('${report.email}')">Mesaj Gönder</button></td>
      </tr>
    `;
    reportsTableBody.innerHTML += row;
  });
}

// İletişim formunu gönder
document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('studentEmail').value;
  const message = document.getElementById('message').value;

  // Mesajı Supabase'a gönder (veya başka bir işlem yap)
  const { error } = await supabase
    .from('messages')
    .insert([{ email: email, message: message }]);
  
  const messageDiv = document.getElementById('contactMessage');
  if (error) {
    messageDiv.innerText = `Hata: ${error.message}`;
  } else {
    messageDiv.innerText = 'Mesaj başarıyla gönderildi!';
    document.getElementById('contactForm').reset();
  }
});

// Sayfa yüklendiğinde öğrenci raporlarını yükle
window.onload = loadStudentReports;
