//axios import buraya gelecek

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: 	
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek
ipAdresimiAl().then(() => {
	var url = "https://apis.ergineer.com/ipgeoapi/" + benimIP;
	axios
	  .get(url)
	  .then((response) => {
		const ipDinamik = response.data;
		const cardes = cardOlustur(ipDinamik);
		const cardsElement = document.querySelector(".cards");
		cardsElement.appendChild(cardes);
	  })
	  .catch((error) => {
		console.log("başarısız", error);
	  });
  });
  function cardOlustur(data) {
	console.log("data bilgi: ", data);
	const card = document.createElement("div");
	card.classList.add("card");
	const ulkeImg = document.createElement("img");
	if (ulkeImg.img) {
	  ulkeImg.src = data.ülkebayrağı;
	} else {
	  ulkeImg.src = "https://flagshub.com/images/flag-of-turkey.png";
	}
	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");
	const ipH3 = document.createElement("h3");
	ipH3.classList.add("ip");
	ipH3.textContent = data.sorgu;
	const country = document.createElement("p");
	country.classList.add("ulke");
	country.textContent = `${data.ülke} (${data.ülkeKodu})`;
	const enBoy = document.createElement("p");
	enBoy.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;
	const city = document.createElement("p");
	city.textContent = `Şehir: ${data.şehir}`;
	const time = document.createElement("p");
	time.textContent = `Saat dilimi: ${data.saatdilimi}`;
	const para = document.createElement("p");
	para.textContent = `Para birimi: ${data.parabirimi}`;
	const ispP = document.createElement("p");
	ispP.textContent = `ISP: ${data.isp}`;
	cardInfo.append(ipH3, country, enBoy, city, time, para, ispP);
	card.append(ulkeImg, cardInfo);
	return card;
  }