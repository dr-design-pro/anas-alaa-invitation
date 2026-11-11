document.addEventListener('DOMContentLoaded', () => {
    const fingerprintBtn = document.getElementById('fingerprint-btn');
    const mainInvitation = document.getElementById('main-invitation');
    const weddingAudio = document.getElementById('wedding-audio');
    const wishesForm = document.getElementById('wishes-form');
    const wishesContainer = document.getElementById('wishes-container');

    // الحدث عند الضغط على بصمة الدخول
    fingerprintBtn.addEventListener('click', () => {
        // تشغيل بوابات الانتقال المودرن
        document.body.classList.add('open-doors');
        
        // إظهار المحتوى الرئيسي بعد جزء من الثانية
        setTimeout(() => {
            mainInvitation.classList.remove('hidden');
        }, 300);

        // تشغيل الموسيقى من الثانية السادسة بالضبط (6.0 ثانية)
        if (weddingAudio) {
            weddingAudio.currentTime = 6.0;
            weddingAudio.play().catch(error => {
                console.log("الاجبار التلقائي للصوت متوقف من المتصفح:", error);
            });
        }
    });

    // التعامل مع نموذج التهاني وتأكيد الحضور
    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');
        
        if(nameInput.value.trim() === '' || messageInput.value.trim() === '') return;

        // إنشاء كارت التهنئة الجديد
        const wishCard = document.createElement('div');
        wishCard.classList.add('wish-card');
        
        wishCard.innerHTML = `
            <h4>${escapeHtml(nameInput.value)}</h4>
            <p>${escapeHtml(messageInput.value)}</p>
            <div class="wish-footer">
                <span>الآن</span>
                <button class="like-btn" onclick="toggleLike(this)">
                    <i class="fa-solid fa-heart"></i> <span class="like-count">0</span>
                </button>
            </div>
        `;

        // إدراج التهنئة في أول القائمة
        wishesContainer.prepend(wishCard);

        // تفريغ الحقول
        nameInput.value = '';
        messageInput.value = '';
    });
});

// دالة تفاعلية لإعجاب الكومنتات (القلب)
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);
    if (btn.classList.contains('liked')) {
        count++;
    } else {
        count--;
    }
    countSpan.textContent = count;
}

// حماية بسيطة للنصوص المدخلة
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}