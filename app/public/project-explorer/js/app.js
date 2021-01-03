const signupForm = document.getElementById('signupForm')
const loginForm = document.getElementById('loginForm')
const creatProjectForm = document.getElementById('createProjectForm')

  fetch('/api/programs',{
    method: 'GET'
  })
  .then((res) => res.json())
  .then((response) => {
      var programs = document.getElementById("program");
      response.forEach((prog) => {
          var opt = document.createElement("option");
          opt.value = prog;
          opt.text = prog;
          programs.appendChild(opt);
      });
  });
  
  fetch('/api/graduationYears',{
    method: 'GET'
  })
  .then((res) => res.json())
  .then((response) => {
      var years = document.getElementById("graduationYear");
      response.forEach((year) => {
          var option = document.createElement("option");
          option.value = year;
          option.text = year;
          years.appendChild(option);
      });
  });


if (signupForm) { 
   signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        register(); 
      });
}
if (loginForm) { 
   loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });
  }
if (creatProjectForm) { 
    creatProjectForm.addEventListener('submit', function (e) {
       e.preventDefault();
       createProject();
   });
  }
function register() {
    let form = document.getElementById('signupForm');
    const data = {
      "firstname": document.getElementById("firstname").value,
      "lastname": document.getElementById("lastname").value,
      "email": document.getElementById("email").value,
      "password": document.getElementById("password").value,
      "matricNumber": document.getElementById("matricNumber").value,
      "program": document.getElementById("program").value,
      "graduationYear": document.getElementById("graduationYear").value
    }; 
  
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        let oldError = form.querySelector('.alert-danger');
  
        if (oldError) oldError.parentNode.removeChild(oldError);
  
        if (data.status == "ok" ) {
          document.cookie = `uid=${data.data.id}; path=/`;
          window.location.replace('/project-explorer/index.html');
        } else{
          let header = form.querySelector('h1');
          let error = document.createElement('div');
          error.setAttribute('class', 'alert alert-danger');
  
          data.errors.forEach((element) => {
            let errorText = document.createTextNode(element);
            error.appendChild(errorText);
            let br = document.createElement('br');
            error.appendChild(br);
          });
  
          header.parentNode.insertBefore(error, header.nextSibling);
        }
      });
}
function login() {
    let form = document.getElementById('loginForm');
    let formData = new FormData(form);
  
    let params = {};
  
    for (var [key, value] of formData.entries()) {
      params[key] = value;
    }
  
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        let oldError = form.querySelector('.alert-danger');
  
        if (oldError) oldError.parentNode.removeChild(oldError);
  
        if (data.status == "ok") {
          document.cookie = `uid=${data.data.id}; path=/`;
          window.location.replace('/project-explorer/index.html');

        } else{
          let header = form.querySelector('h1');
          let error = document.createElement('div');
          error.setAttribute('class', 'alert alert-danger');
          error.innerHTML = "Invalid email/password";
          header.parentNode.insertBefore(error, header.nextSibling);
        }
      });
}

function createProject() {
  const uid = getCookie('uid')
  if(uid){
  let form = document.getElementById('createProjectForm');
    
  const data = {
    "name": document.getElementById("name").value,
    "abstract": document.getElementById("abstract").value,
    "authors": document.getElementById("authors").value.split(","),
    "tags": document.getElementById("tags").value.split(",")
  }; 
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        let oldError = form.querySelector('.alert-danger');
  
        if (oldError) oldError.parentNode.removeChild(oldError);
  
        if (data.status == "ok" ) {
          document.cookie = `uid=${uid}; path=/`;
          window.location.replace('/project-explorer/index.html');
        } else{
          let header = form.querySelector('h1');
          let error = document.createElement('div');
          error.setAttribute('class', 'alert alert-danger');
  
          data.errors.forEach((element) => {
            let errorText = document.createTextNode(element);
            error.appendChild(errorText);
            let br = document.createElement('br');
            error.appendChild(br);
          });
  
          header.parentNode.insertBefore(error, header.nextSibling);
        }
      });
    }
}

//this gets the users cookie
//Gotten from w3 schools
function getCookie(uid) {
  var name = uid + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//this checks for cookie when loading a page
window.onload = (event) => {
  const uid = getCookie('uid');
  if(uid){
    const user = getUserInfo(uid);
  }
}

//this gets the user info from te cookie specified
function getUserInfo(uid){
  fetch(`/api/users/${uid}`, {
    method: 'GET'
  })
  .then((res) => res.json())
  .then((res) => {
    changeNavItems(res);
  })
  .catch((err) => console.log(err));
}

//this changes the nav items to show Hi, {username} for the user that logs in
function changeNavItems(user){
  const signup = document.querySelector('a[href="Register.html"]');
  const login = document.querySelector('a[href="login.html"]');
  signup.setAttribute('hidden', true);
  login.setAttribute('hidden', true);
  const ul = document.querySelector('ul[class~="ml-auto"]');
  const logoutLi = document.createElement('li');
  logoutLi.setAttribute('id', 'logout');
  logoutLi.setAttribute('class', 'nav-item');
  logoutLi.addEventListener('click', logoutUser);
  logoutLi.innerHTML = '<button class="btn btn-primary">Logout</button>'
  ul.append(logoutLi);
  const nameLi = document.createElement('li');
  nameLi.setAttribute('id', 'username');
  nameLi.setAttribute('class', 'nav-item');
  nameLi.innerHTML = `<a class="nav-link active">Hi, ${user.firstname}</a>`;
  ul.append(nameLi);
  getProjectData()
}

//this logsout a user and deletes the cookie
function logoutUser(){
  document.cookie = "uid= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  window.location.replace('/project-explorer/index.html');
}

// This gets the project data and sends the result to the changeProjectItems function
function getProjectData() {
  fetch(`/api/projects`, {
    method: 'GET'
  })
  .then((res) => res.json())
  .then((res) => {
    changeProjectItems(res);
  })
  .catch((err) => console.log(err));
}


//this displays the project data, also loops through and shows only 4 project at a time
function changeProjectItems(project) {
  for(i = 0; i < 4; i++){
    var showcase = document.querySelector('.showcase')
    var column = document.createElement('div')
    var card = document.createElement('div')
    var cardBody = document.createElement('div')
    var projectName = document.createElement('a')
    var authors = document.createElement('p')
    var projectContent = document.createElement('p')
    var tagDiv = document.createElement('div')
    var tag = document.createElement('p')

    //This is what im talking about sha step 9, go to line 260
    projectName.href = `viewProject.html?id=${project[i].id}`;
    column.setAttribute('class', 'col-md-3')
    card.setAttribute('class', 'card mb-4 box-shadow')
    cardBody.setAttribute('class', 'card-body')
    projectName.setAttribute('class', 'text-primary link')
    authors.setAttribute('class', 'card-text')
    projectContent.setAttribute('class', 'card-text')
    tagDiv.setAttribute('class', 'd-flex justify-content-between align-items-center')
    tag.setAttribute('class', 'text-primary')

    showcase.append(column)
    column.append(card)
    card.append(cardBody)
    projectName.innerHTML = `${project[i].name}`
    cardBody.append(projectName)

    authors.innerHTML = `${project[i].authors}`
    projectContent.innerHTML =`${project[i].abstract}`

    function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
      insertAfter(authors, projectName)
      insertAfter(projectContent, authors)
      insertAfter(tagDiv, projectContent)
      
    tag.innerHTML= `${project[i].tags}`
    tagDiv.append(tag)
   }

  //  for (var i = 0; i < link.length; i++){
  //   link[i].addEventListener('click', function (e) {
  //     e.preventDefault();
  //     getProject(); 
  //   });
  //  }
}
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  console.log(id)
  fetch(`/api/projects/${id}`, {
    method: 'GET'
  })
  .then((res) => res.json())
  .then((res) => {
    var div = document.querySelector('.mt-5')
    var create = document.querySelector('.createdBy')
    var hori = document.querySelector('.hori')
    var authors = document.querySelector('.Author')
    var tags = document.querySelector('.tags')

    var projectName = document.createElement('h2')
    var author = document.createElement('p')
    var abstract = document.createElement('p')
    
    projectName.setAttribute('id', 'project_name')
    projectName.innerHTML = `${res.name}`

    author.setAttribute('id', 'project_author')

    getUserName(res.createdBy)

    function getUserName(id) {
      fetch(`/api/users/${id}`, {
        method: 'GET'
      })
      .then((res) => res.json())
      .then((res) => {
        var name = `${res.firstname}  ${res.lastname}`
        username(name);
      })
      .catch((err) => console.log(err));
    }

    function username(name) {
      author.innerHTML = `${name}`
    }

    abstract.setAttribute('id', 'project_abstract')
    abstract.innerHTML = `${res.abstract}`

    res.authors.forEach((element) =>{
      var border = document.createElement('div')
      var authorName = document.createElement('p')

      border.setAttribute('class', 'border')
      authorName.setAttribute('class', 'my-4 mx-3')

      authorName.innerHTML = `${element}`

      function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }
      insertAfter(border, authors)
      border.append(authorName)
    })

    tags.innerHTML =`${res.tags}`

    div.append(projectName)
    create.append(author)
    hori.append(abstract)
  })


  