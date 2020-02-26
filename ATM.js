class ATM {

    static elementIds = {
        inputId: 'inputValue',
        giveId: 'giveMoney',
        resultId: 'result',
        billsId: 'bills'
    };

    static elements = {
        inputEl: document.getElementById(ATM.elementIds.inputId),
        giveEl: document.getElementById(ATM.elementIds.giveId),
        resultEl: document.getElementById(ATM.elementIds.resultId),
        billsEl: document.getElementById(ATM.elementIds.billsId)
    };

    constructor() {
        this.bills = [
            {
                id: 10,
                name: '۱۰،۰۰۰ تومانی',
                price: 10000,
                number: 0,
                selected: false
            },
            {
                id: 5,
                name: '۵،۰۰۰ تومانی',
                price: 5000,
                number: 0,
                selected: false
            },
            {
                id: 2,
                name: '۲،۰۰۰ تومانی',
                price: 2000,
                number: 0,
                selected: false
            },
            {
                id: 1,
                name: '۱،۰۰۰ تومانی',
                price: 1000,
                number: 0,
                selected: false
            }
        ];

        this.render();
        this.mount();
        this.timeout();
    }

    mount() {
        ATM.elements.inputEl.focus();
        ATM.elements.inputEl
            .addEventListener('keypress', (event) => {
                if (event.keyCode !== 13)
                    return;
                this.submitWithdraw()
            });

        ATM.elements.giveEl
            .addEventListener('click', () => this.submitWithdraw())
    }

    toggleCheck(id){
        this.bills = this.bills.map(bill => {
            if (bill.id === id) {
                bill.selected = !bill.selected;
            }
            return bill;
        });
    }

    submitWithdraw(){
        const amount = ATM.elements.inputEl.value;
        ATM.elements.inputEl.value = '';
        ATM.elements.inputEl.focus();
        if(!amount)
            return;
        this.withdraw(amount);
    }

    withdraw(amount){
        this.selectedBills = this.bills.filter(bill => bill.selected);
        if(this.selectedBills.length === 0){
            ATM.elements.resultEl.innerHTML = '<h5><i class="fas fa-exclamation-triangle fa-2x"></i></h5><h5>شما هیچ نوع اسکناسی انتخاب نکرده اید. لطفا ابتدا اسکناس های مورد تقاضای خود را مشخص کنید.</h5>';
            return;
        }

        this.selectedBills = this.selectedBills.map(bill => {
                bill.number = parseInt(amount / bill.price);
                amount = amount % bill.price;
                return bill
            });
        this.showResults(amount)
    }

    showResults(amount){
        let newHtml;

        if(amount !== 0){
            ATM.elements.resultEl.innerHTML = '<h5><i class="fas fa-exclamation-triangle fa-2x"></i></h5><h5>متاسفانه امکان پرداخت وجه مورد نظر با اسکناس های مد نظر شما وجود ندارد. لطفا در انتخاب اسکناس های مورد نظر خود و یا مبلغ دریافتی تجدید نظر کنید.</h5>';
            return;
        }
        ATM.elements.resultEl.innerHTML = '<h5><i class="fas fa-check-circle fa-2x"></i></h5>';
        this.selectedBills.forEach(bill => {
            newHtml = `<h5>شما ${bill.number} عدد اسکناس ${bill.name} دریافت کردید.</h5>`;
            ATM.elements.resultEl.insertAdjacentHTML('beforeend', newHtml);
        });
        const thankNote = '<div class="thank-note"><h6>از اینکه ما را برای تراکنش مالی خود انتخاب کردید سپاس گزاریم.</h6><h6>به امید دیدار مجدد شما</h6></div>';
        ATM.elements.resultEl.insertAdjacentHTML('beforeend', thankNote);
    }

    timeout(){
        setTimeout(() => {
            ATM.elements.giveEl.disabled = true;
            ATM.elements.inputEl.disabled = true;
            ATM.elements.resultEl.innerHTML = '<h5><i class="fas fa-exclamation-triangle fa-2x"></i></h5><h5>متاسفانه مهلت یک دقیقه ای شما برای ارسال درخواست به پایان رسید. لطفا مجددا صفحه را بارگزاری نموده و درخواست خود را سریع تر ارسال کنید.</h5>'
        }, 60000)
    }

    render(){
        this.bills.forEach(bill => {
            const billsHtml = `
            <div class="col-lg-3 col-md-6">
                <div class="card bill-card">
                    <img src="assets/img/${bill.id}.jpg" class="card-img-top" alt="${bill.name}">
                    <div class="card-body">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onclick="atm.toggleCheck(${bill.id})" id="${bill.id}">
                            <label class="form-check-label" for="${bill.id}">
                                ${bill.name}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            `;
            ATM.elements.billsEl.insertAdjacentHTML('beforeend', billsHtml);
        })
    }
}

class Timer {
    constructor(){
        this.counter0 = 60;
        this.counter();
        this.start();
    }

    counter(){
        this.second = String(this.counter0 % 60).padStart(2, '0');
        this.minute = String(parseInt(this.counter0 / 60) % 60).padStart(2, '0');
        document.getElementById('timer').innerText =
            `${this.minute}:${this.second}`;
    }

    start(){
        this.timerInterval = setInterval(() => {
            this.counter0--;
            this.counter();
            if(this.counter0 == 0){
                document.getElementById('timeout').style.color = 'red';
                this.stop()
            }
        }, 1000);
    }

    stop(){
        clearInterval(this.timerInterval);
    }
}

const timer = new Timer();

const atm = new ATM();