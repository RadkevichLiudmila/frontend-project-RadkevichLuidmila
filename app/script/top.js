'use strict';

function showResult() {
  let AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  let storageAJAX ={};
  let myName = 'Radkevich_project_results';

  $.ajax(
    {
      url: AjaxHandlerScript,
      type: 'POST',
      data: {f: 'READ', n: myName},
      cache: false,
      success: writeReady,
      error: ErrorHandler
    }
  );

  function writeReady(Result) {
    storageAJAX = JSON.parse(Result.result);

    let people = [];
    for (let key in storageAJAX) {
      people.push({name:key, result:storageAJAX[key]});
    }

    function sortResult(personA, personB) {
      return  personB.result - personA.result;
    }
    people.sort(sortResult);

    let page = `<p>`;

    people.slice(0, 10).forEach(function(item, i, people) {
      page += `${i+1}. ${item.name} -  ${item.result}. <br>`;
    });
    page += `</p>`;

    let resultLocal =JSON.parse(localStorage.getItem('BESTResult')) || [];
    resultLocal[0] = resultLocal[0] || 'Player';
    resultLocal[1] = resultLocal[1] || 0;

    page += `<h3>Лучший результат на этом устройстве</h3>`;
    page += `<p>${resultLocal[0]} - ${resultLocal[1]}</p>`;

    let contResult = document.createElement('div');
    contResult.id = 'contResult';
    document.getElementById('IPage').appendChild(contResult);
    document.getElementById('contResult').innerHTML = page;
  }

}
