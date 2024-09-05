window.addEventListener("load", () => {
  let adminID = localStorage.getItem("loginID");

  if (!adminID) {
    location.href = "http://127.0.0.1:5500/cms-frontend/login.html";
    return;
  }

  fetch(`http://127.0.0.1:4000/api/admins/${adminID}`)
    .then((res) => res.json())
    .then((admin) => {
      console.log(admin);
      document.title = `Panel - ${admin.firstName} ${admin.lastName}`;
    });
});
