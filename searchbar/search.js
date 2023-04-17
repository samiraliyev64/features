const data = [
  { ad: "Samir", soyad: "Aliyev", sahe: "Proqramlasdirma" },
  { ad: "Ferrux", soyad: "Aliyev", sahe: "Dizayn" },
  { ad: "Emil", soyad: "Aliyev", sahe: "Proqramlasdirma" },
  { ad: "Refail", soyad: "Aliyev", sahe: "Dizayn" },
  { ad: "Mehemmed", soyad: "Ismayilov", sahe: "Sistem Adminstrasiyasi" },
  { ad: "Mehemmed", soyad: "Ceferzade", sahe: "Proqramlasdirma" },
  { ad: "Elvin", soyad: "Aliyev", sahe: "Proqramlasdirma" },
  { ad: "Mehemmed", soyad: "Dursunov", sahe: "Dizayn" },
  { ad: "Nicat", soyad: "Aliyev", sahe: "Dizayn" },
  { ad: "Rizvan", soyad: "Aliyev", sahe: "Sistem Adminstrasiyasi" },
  { ad: "Jack", soyad: "Grealish", sahe: "Dizayn" },
  { ad: "Marcus", soyad: "Rashford", sahe: "Sistem Adminstrasiyasi" },
  { ad: "Cristiano", soyad: "Ronaldo", sahe: "Dizayn" },
  { ad: "Wayne", soyad: "Rooney", sahe: "Proqramlasdirma" },
  { ad: "Arda", soyad: "Guler", sahe: "Proqramlasdirma" },
  { ad: "Kerem", soyad: "Akturkoglu", sahe: "Proqramlasdirma" },
  { ad: "Erling", soyad: "Haaland", sahe: "Dizayn" },
  { ad: "Keylor", soyad: "Navas", sahe: "Proqramlasdirma" },
  { ad: "Andres", soyad: "Iniesta", sahe: "Sistem Adminstrasiyasi" },
  { ad: "Luke", soyad: "SHaw", sahe: "Proqramlasdirma" },
];

const searchInput = document.querySelector("#searchInput");
const results = document.querySelector("#results");
let search_term = "";
let counter = 1;

searchInput.addEventListener("input", (e) => {
  search_term = e.target.value.toLowerCase();
  showList();
});

const showList = () => {
  counter = 1;
  results.innerHTML = "";
  data
    .filter((person) => {
      return (
        person.ad.toLowerCase().includes(search_term) ||
        person.soyad.toLowerCase().includes(search_term) ||
        person.sahe.toLowerCase().includes(search_term)
      );
    })
    .forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = `<span style="font-weight:bold;color:red">No</span>: ${counter},  
                      <span style="font-weight:bold;color:green">Ad</span>: ${e.ad}, 
                      <span style="font-weight:bold;color:blue">Soyad</span>: ${e.soyad}, 
                      <span style="font-weight:bold;color:blue">Sahe</span>: ${e.sahe}`;
      results.appendChild(li);
      counter++;
    });
};

showList();
