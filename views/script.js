var convertBtn = document.querySelector('.convert-button');
const select = document.getElementById('quality-choose')
const urlInput = document.getElementById('url-input')

convertBtn.addEventListener('click', () => {
    if (select.innerHTML == '') {
        window.location.href = 'https://burgundy-beaver-sari.cyclic.app/?url='+urlInput.value
    }else {
        if (select.value!='') {
            window.location.href = 'https://burgundy-beaver-sari.cyclic.app/download?itag='+select.value+'&url='+window.location.href.split('?url=')[1]

        
    }
    }  
});
