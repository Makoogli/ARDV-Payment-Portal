'use client'

import React from 'react';

export function InputFormData({catalog}){
    function updatePrices(key,dif){
      console.log(catalog);
        let sumMonthly = 0;
        let sumYearly = 0;
        let sumYearly20off = 0;
        let sumYearly30off = 0;
        let sumMonthly99PerMonth = 0;
        let sumMonthly199PerMonth = 0;
        let sumYearly99PerMonth = 0;
        let sumYearly199PerMonth = 0;
        Object.entries(catalog).forEach(e=>{
            if(e[0] == key){
                document.getElementById(e[0]).value = Math.max(0,parseInt(document.getElementById(e[0]).value)+dif);
            }
            let q = parseInt(document.getElementById(e[0]).value) || 0;
            sumMonthly += q*e[1].monthly.price;
            sumYearly += q*e[1].yearly.price;
            sumYearly20off += e[1].yearly20off?q*e[1].yearly20off.price:q*e[1].yearly.price;
            sumYearly30off += e[1].yearly30off?q*e[1].yearly30off.price:q*e[1].yearly.price;
            sumMonthly99PerMonth += e[1].monthly99permonth?q*e[1].monthly99permonth.price:q*e[1].monthly.price;
            sumMonthly199PerMonth += e[1].monthly199permonth?q*e[1].monthly199permonth.price:q*e[1].monthly.price;
            sumYearly99PerMonth += e[1].yearly99permonth?q*e[1].yearly99permonth.price:q*e[1].yearly.price;
            sumYearly199PerMonth += e[1].yearly199permonth?q*e[1].yearly199permonth.price:q*e[1].yearly.price;
        });
        document.getElementById('price-monthly').innerText = sumMonthly;
        document.getElementById('price-yearly').innerText = sumYearly;
        document.getElementById('price-yearly20off').innerText = sumYearly20off;
        document.getElementById('price-yearly30off').innerText = sumYearly30off;
        document.getElementById('price-yearly-99-per-month').innerText = sumYearly99PerMonth;
        document.getElementById('price-yearly-199-per-month').innerText = sumYearly199PerMonth;
        document.getElementById('price-monthly-99-per-month').innerText = sumMonthly99PerMonth;
        document.getElementById('price-monthly-199-per-month').innerText = sumMonthly199PerMonth;
    }
    function toggleShowDiscounts(){
      let discounts = document.getElementById('discounts');
      if(discounts.show == true){
        discounts.show = false;
        discounts.style.display = 'none';
      }else{
        discounts.show = true;
        discounts.style.display = 'flex';
      }
    }
    return (
        <div>
            <div>
                {Object.keys(catalog).map((e,idx)=>{
                    return (
                        <div className="line" key={idx}>
                            {e}: 
                            
                            <input type="button" value="-" onClick={()=>updatePrices(e,-1)}/><input id={e} name={e} defaultValue="0" readOnly/><input type="button" value="+" onClick={()=>updatePrices(e,1)}/>
                            
                        </div>
                    )
                })}
            </div>
            <div className="prices">
                <div className="price">
                    Monthly: $<span id="price-monthly">0</span><input type="radio" name="paymentFrequency" value="monthly" required/>
                </div>
                <div className="price">
                    Yearly 10% off: $<span id="price-yearly">0</span><input type="radio" name="paymentFrequency" value="yearly"/>
                </div>
            </div>
            <div className="partners_container">
                <a onClick={toggleShowDiscounts}><u>Partners</u></a>
            </div>
            <div id="discounts" className="prices hidden">
                <div>
                    <div className="price">
                        Year 20% off: $<span id="price-yearly20off">0</span><input type="radio" name="paymentFrequency" value="yearly20off"/>
                    </div>
                    <div className="price">
                        $199/mo: $<span id="price-monthly-199-per-month">0</span><input type="radio" name="paymentFrequency" value="monthly199permonth"/>
                    </div>
                    <div className="price">
                        $99/mo: $<span id="price-monthly-99-per-month">0</span><input type="radio" name="paymentFrequency" value="monthly99permonth"/>
                    </div>
                </div>
                <div>
                    <div className="price">
                        Yearly 30% off: $<span id="price-yearly30off">0</span><input type="radio" name="paymentFrequency" value="yearly30off"/>
                    </div>
                    <div className="price">
                        $199/mo {"("}-10%{")"}: $<span id="price-yearly-199-per-month">0</span><input type="radio" name="paymentFrequency" value="yearly199permonth"/>
                    </div>
                    <div className="price">
                        $99/mo {"("}-10%{")"}: $<span id="price-yearly-99-per-month">0</span><input type="radio" name="paymentFrequency" value="yearly99permonth"/>
                    </div>
                </div>
            </div>
        </div>
    )
}