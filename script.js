let menuList = document.getElementById("menuList")
        menuList.style.maxHeight = "0px";

        function toggleMenu() {
            if (menuList.style.maxHeight == "0px") {
                menuList.style.maxHeight = "300px";
            }
            else {
                menuList.style.maxHeight = "0px";
            }
        }
        function sendMail(){
            let contact = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim()
            };
        
            if (!contact.name || !contact.email || !contact.subject || !contact.message) {
                alert("Please fill out all fields in the form.");
                return;
            }
        
            emailjs.send("service_zstr0l8", "template_c612iys", contact)
                .then(() => {
                    alert("Message received! Thanks for contacting us 👍");
                })
                .catch((error) => {
                    console.error("Failed to send message:", error);
                    alert("Something went wrong. Please try again later.");
                });
        }
        