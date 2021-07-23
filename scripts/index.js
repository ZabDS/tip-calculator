let tip = 0;
let bill = 0;
let nPeople = 0;

$(document).ready(()=>{
    const billLbl = $('#bill-field');
    const customTip = $('#tip-custom-field');
    const nPeopleLbl = $('#people-field');
    const btnSet = [$('#btn-5'),$('#btn-10'),$('#btn-15'),$('#btn-25'),$('#btn-50')];

    const resetBtn = $('#reset-btn');
    const errorLbl = $('.label-field-error')

    setDefaultValues(billLbl,customTip,nPeopleLbl);

    btnSet.map((btn,index)=>{
        btn.click(()=>getTipBtn(index,btn));
    });

    customTip.on({
        'click': (e)=>onCustomTip(e) ,
        'change': (e)=>onCustomTip(e)
    });

    billLbl.change((e)=>{
        bill=parseInt(e.target.value);
        calculatetTipAmount();
        calculateTotal();
    });

    nPeopleLbl.change((e)=>{
        // console.log(errorLbl);
        nPeople=parseInt(e.target.value);
        if (nPeople){
            errorLbl.css({ "visibility": "hidden"});
            nPeopleLbl.css({"border":"none"});
            nPeopleLbl.css({"padding":"7px 10px"});
        }else{
            errorLbl.css({ "visibility": "visible"});
            nPeopleLbl.css({"border":"2px solid rgb(143, 0, 0)"});
            nPeopleLbl.css({"padding":"5px 10px"});
        }
        calculatetTipAmount();
        calculateTotal();
    });

    resetBtn.click(()=>setDefaultValues(billLbl,customTip,nPeopleLbl));
});

const setDefaultValues = (billLbl, customLbl, nPeopleLbl) => {
    const tipAmountLbl = $('#tip-amount-lbl');
    const totalLbl = $('#total-lbl');
    
    tip = 0;
    bill = 0;
    nPeople = 0;
    billLbl.val('');
    customLbl.val('');
    nPeopleLbl.val('');
    tipAmountLbl.text('$0.00');
    totalLbl.text('$0.00');
    unpressBtn();

    // console.log('Reset');
}

const calculatetTipAmount = () => {
    const tipAmountLbl = $('#tip-amount-lbl');
    let tipA = (bill * (tip / 100)) / nPeople;
    let str = tipA && (nPeople !== 0) ? `$${tipA.toFixed(2)}` : '$0.00'

    tipAmountLbl.text(str);
    // console.log(tipA);
}

const calculateTotal = () =>{
    const totalLbl = $('#total-lbl');
    const tipAmountLbl = $('#tip-amount-lbl');
    
    let tipA = parseInt((tipAmountLbl.text()).slice(1));
    let total = (bill + tipA) / nPeople;
    let str = total && (nPeople !== 0) ? `$${total.toFixed(2)}` : '$0.00'
    totalLbl.text(str);
}

const onCustomTip = (e) =>{
    unpressBtn();
    tip = parseInt(e.target.value);
    // console.log(tip)
    calculatetTipAmount();
    calculateTotal();
}
const getTipBtn = (index,btn)=>{
    switch (index) {
        case 0:
            tip=5;
            break;
        case 1:
            tip=10;
            break;
        case 2:
            tip=15;
            break;
        case 3:
            tip=25;
            break;
        case 4:
            tip=50;
            break;
        default:
            // console.log("No tip")
            break;
    }
    unpressBtn();
    btn.addClass('tip-btn-selected');
    calculatetTipAmount();
    calculateTotal();
}

const unpressBtn = () => {
    const selectedBtn = $('.tip-btn-selected');
    selectedBtn.removeClass('tip-btn-selected')
}