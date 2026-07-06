
let certZoom = 100;

function openCertModal(src, title) {
    document.getElementById('certImage').src = src;
    document.getElementById('certTitle').textContent = title;
    certZoom = 100;
    updateZoom();
    document.getElementById('certModal').classList.add('active');
}

function closeCertModal() {
    document.getElementById('certModal').classList.remove('active');
}

function zoomCert(delta) {
    certZoom = Math.min(300, Math.max(30, certZoom + delta));
    updateZoom();
}

function updateZoom() {
    document.getElementById('zoomLevel').textContent = certZoom + '%';
    document.getElementById('certImage').style.transform = `scale(${certZoom / 100})`;
}


// show more show less
const showMoreBtn = document.getElementById("showMoreBtn");
const extraProjects = document.getElementById("extraProjects");

showMoreBtn.addEventListener("click", () => {
    const isActive = extraProjects.classList.toggle("active");
    showMoreBtn.textContent = isActive ? "Show Less" : "Show More";

    setTimeout(() => {
        if (window.AOS) AOS.refresh();
    }, 650);
});

// redrect research paper publish site
function redirectRpPublish() {
    window.location.href = "https://ijsrst.com/home/article/view/IJSRST26133160";
}


// slider
const cerTrack = document.getElementById('cerTrack');
const cerCards = cerTrack.querySelectorAll('.extraCertificate');
const cerTotal = cerCards.length;

const cerPrevBtn = document.getElementById('cerPrevBtn');
const cerNextBtn = document.getElementById('cerNextBtn');

let cerIndex = 0;

function updateCerSlider() {
    if (cerTotal === 0) return;

    const cardWidth = cerCards[0].getBoundingClientRect().width;

    const trackWidth = cerTrack.parentElement.getBoundingClientRect().width;
    const cerVisible = Math.round(trackWidth / cardWidth);

    const computedStyle = window.getComputedStyle(cerTrack);
    const gap = parseFloat(computedStyle.gap) || 0;

    cerTrack.style.transform = `translateX(-${cerIndex * (cardWidth + gap)}px)`;


    cerPrevBtn.disabled = cerIndex === 0;
    cerNextBtn.disabled = cerIndex >= cerTotal - cerVisible;
}

cerPrevBtn.addEventListener('click', () => {
    if (cerIndex > 0) {
        cerIndex--;
        updateCerSlider();
    }
});

cerNextBtn.addEventListener('click', () => {
    const cardWidth = cerCards[0].getBoundingClientRect().width;
    const trackWidth = cerTrack.parentElement.getBoundingClientRect().width;
    const cerVisible = Math.round(trackWidth / cardWidth);

    if (cerIndex < cerTotal - cerVisible) {
        cerIndex++;
        updateCerSlider();
    }
});
window.addEventListener('resize', updateCerSlider);
updateCerSlider();


// FAQ
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) item.classList.add('active');
    });
});


// send maila ajax
const sendMsg = document.getElementById("SendMsgToUser").addEventListener("click", (e) => {
    e.preventDefault();
    const Name=document.getElementById("name").value;
    const Email=document.getElementById("email").value;
    const Message=document.getElementById("msg").value;

    $.ajax({
        type: "POST",
        url: "/sendEmail",
        data: { name:Name,email:Email,msg:Message},
        success: function (data) {
            if (data.success) {
            alert("Your MSG Send Successfully...!");
        }
        },
        error: function (err) {
           alert("MSG Not Send...!");
        }
    });
})

