	async function populate() {

      const requestURL = 'https://api.github.com/users/marcelolemes/repos';
      const request = new Request(requestURL);

      const response = await fetch(request);
      const ReposText = await response.text();

      Repositories = JSON.parse(ReposText);

     
      populateRepos(Repositories);
	  

    }
    populate();
   function populateRepos(obj) {
      const section = document.querySelector('section');
      section.id = `section2`;
      
      for (const repo of obj) {
        let language = repo.language;
        if (language == null)
          language="NULL";
        else
          language = language.toUpperCase();
        let checkBox = document.getElementById(language);
        console.log(repo.name);
        console.log(checkBox);
        if (checkBox.checked == true){
        const myArticle = document.createElement('tr');
        //const myH2 = document.createElement('h4');
        const myPara1 = document.createElement('td');
        const myPara2 = document.createElement('td');
        const myPara3 = document.createElement('td');
        //const myList = document.createElement('ul');
        //myH2.textContent = repo.name;
        myPara1.textContent = `Repositório: ${repo.name}`;
        myPara2.textContent = `Url: ${repo.clone_url}`;
        myPara3.textContent = `Commit em: ${repo.pushed_at}`;
        myArticle.className = `article`;
        myArticle.id = `${repo.name}`.toUpperCase();
        //myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        //myArticle.appendChild(myList);
        section.appendChild(myArticle);
        
      }
      }
    }
    function clear(){
    let lista=[]; 
    let x = document.getElementById("section2").querySelectorAll(".article");
    for (var i=0, max=x.length; i < max; i++) {
      if (x[i].id.startsWith(document.getElementById("pesquisa").value.toUpperCase())){
        //document.getElementById(x[i].id).style.visibility='visible';
        lista.push(document.getElementById(x[i].id));
      }
      else{
        //document.getElementById(x[i].id).style.visibility='hidden';
      }
      populateRepos(lista);
    } 
       
      }
      function orderAlfa(){
        Repositories = Repositories.sort(function (a, b) {
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            }
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            }
            return 0;
          });
          reload();
      }
      function orderDate(){
        Repositories = Repositories.sort(function (a, b) {
            if (a.pushed_at > b.pushed_at) {
              return 1;
            }
            if (a.pushed_at < b.pushed_at) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          reload();
      } 
      function reload() {
        
        const section = document.getElementById('section2');
        let filhos = section.childNodes;
        for( i = filhos.length - 1; i >= 0; i-- ) {
          if( filhos[i].className == 'article' ) {
            section.removeChild( filhos[i] );
          }
        }

        
        for (const repo of Repositories) {
        const myArticle = document.createElement('tr');
        let language = repo.language;
        if (language == null)
          language="NULL";
        else
          language = language.toUpperCase();
        
        let checkBox = document.getElementById(language);
        if (checkBox.checked == true){
          let issues = document.getElementById("ISSUES");
          if (issues.checked == true && repo.open_issues_count <0){
          }
          else if((issues.checked == true && repo.open_issues_count >0) || (issues.checked == false)) {
            let fork = document.getElementById("FORK");
            if ((fork.checked == true && repo.forks_count > 0) || (fork.checked == false)){
              if(repo.name.toUpperCase()
              .startsWith(document.getElementById("pesquisa")
              .value.toUpperCase())){
                //const myH2 = document.createElement('h2');
                const myPara1 = document.createElement('td');
                const myPara2 = document.createElement('td');
                const myPara3 = document.createElement('td');
                //const myList = document.createElement('ul');

                //myH2.textContent = repo.name;
                myPara1.textContent = `Repositório: ${repo.name}`;
                myPara2.textContent = `Url: ${repo.clone_url}`;
                myPara3.textContent = `Commit em: ${repo.pushed_at}`;
                myArticle.className = `article`;
                myArticle.id = `${repo.name}`.toUpperCase();
               // myArticle.appendChild(myH2);
                myArticle.appendChild(myPara1);
                myArticle.appendChild(myPara2);
                myArticle.appendChild(myPara3);
               // myArticle.appendChild(myList);
                section.appendChild(myArticle);
            
        }
      }
      else{

      }
    }
  }
        }
} 
    
   
          
    
    
