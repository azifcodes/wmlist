function decrypt(message="", key="")
{
		var code = CryptoJS.AES.decrypt(message, key);
		var decryptedMessage = code.toString(CryptoJS.enc.Utf8);
		return decryptedMessage;
}

function copy(btnElement, event)
{
		navigator.clipboard.writeText(btnElement.textContent);
}

const tBody = document.getElementById("tBody");
const btn = document.getElementById("btn");
const keyInp = document.getElementById("keyInp");
const iCard = document.getElementById("iCard");
const table = document.getElementById("table");

btn.onclick = function()
{
		iCard.style = "display: none;";
		
		let key = keyInp.value;
		
		Papa.parse("https://azifcdn.imfast.io/data.csv",
				{
						download: true,
						delimiter: function(input) {return "@$!"},
						complete: function(res)
						{
								for (let i=0; i<res.data.length; i++)
								{
										let n = decrypt(res.data[i][1], key);
										let d = decrypt(res.data[i][2], key);
										tBody.innerHTML += "<tr><th scope='row'>"+ res.data[i][0] +"</th><td>" + n + "</td><td>" + '<button type="button" class="btn btn-light" onclick="copy(this, event)">' + d + '</button>' + "</td></tr>";
								}
								
								table.style = "";
						}
				});
}
