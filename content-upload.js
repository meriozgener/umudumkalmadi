document.getElementById('uploadForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const title = document.getElementById('contentTitle').value;
  const file = document.getElementById('contentFile').files[0];
  
  if (!file) {
    alert('Lütfen bir dosya seçin.');
    return;
  }

  const { data, error } = await window.supabaseClient
    .storage
    .from('content')
    .upload(`${title}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false
    });

  const messageDiv = document.getElementById('uploadMessage');
  
  if (error) {
    messageDiv.innerText = `Hata: ${error.message}`;
  } else {
    messageDiv.innerText = `Başarıyla yüklendi: ${data.Key}`;
  }
});
