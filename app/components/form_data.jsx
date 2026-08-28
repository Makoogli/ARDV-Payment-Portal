'use client'

import React from 'react';

export function InputFormData({catalog}){
    function updatePrices(key,dif){
        let sumMonthly = 0;
        let sumYearly = 0;
        let sumYearly20off = 0;
        let sumYearly30off = 0;
        let sumYearly20pbb = 0;
        let sumYearly10pbb = 0;
        Object.entries(catalog).forEach(e=>{
            if(e[0] == key){
                document.getElementById(e[0]).value = Math.max(0,parseInt(document.getElementById(e[0]).value)+dif);
            }
            let q = parseInt(document.getElementById(e[0]).value) || 0;
            sumMonthly += q*e[1].monthly.price;
            sumYearly += q*e[1].yearly.price;
            sumYearly20off += e[1].yearly20off?q*e[1].yearly20off.price:q*e[1].yearly.price;
            sumYearly30off += e[1].yearly30off?q*e[1].yearly30off.price:q*e[1].yearly.price;
            sumYearly20pbb += e[1].yearly20pbb?q*e[1].yearly20pbb.price:q*e[1].yearly.price;
            sumYearly10pbb += e[1].yearly10pbb?q*e[1].yearly10pbb.price:q*e[1].yearly.price;
        });
        document.getElementById('price-monthly').innerText = sumMonthly;
        document.getElementById('price-yearly').innerText = sumYearly;
        document.getElementById('price-yearly20off').innerText = sumYearly20off;
        document.getElementById('price-yearly30off').innerText = sumYearly30off;
        document.getElementById('price-yearly20pbb').innerText = sumYearly20pbb;
        document.getElementById('price-yearly10pbb').innerText = sumYearly10pbb;
        document.getElementById('yearly-save').innerText = 12*sumMonthly-sumYearly;
    }
    function toggleShowDiscounts(){
      let discounts = document.getElementById('discounts');
      let save = document.getElementById('saveYearly');
      if(discounts.show == true){
        discounts.show = false;
        discounts.style.display = 'none';
        save.style.display = 'flex';
      }else{
        discounts.show = true;
        discounts.style.display = 'flex';
        save.style.display = 'none';
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
                    Yearly: $<span id="price-yearly">0</span><input type="radio" name="paymentFrequency" value="yearly"/>
                </div>
            </div>
            <div className="partners_container">
                <a onClick={toggleShowDiscounts}><u>Partners</u></a>
            </div>
            <div id="discounts" className="prices hidden">
                <div>
                    <div className="price">
                        Yearly 20% off: $<span id="price-yearly20off">0</span><input type="radio" name="paymentFrequency" value="yearly20off"/>
                    </div>
                    <div className="price">
                        Yearly 30% off: $<span id="price-yearly30off">0</span><input type="radio" name="paymentFrequency" value="yearly30off"/>
                    </div>
                </div>
                <div>
                    <div className="price">
                        Yearly $20/bb: $<span id="price-yearly20pbb">0</span><input type="radio" name="paymentFrequency" value="yearly20pbb"/>
                    </div>
                    <div className="price">
                        Yearly $10/bb: $<span id="price-yearly10pbb">0</span><input type="radio" name="paymentFrequency" value="yearly10pbb"/>
                    </div>
                </div>
            </div>
            <div id="saveYearly" className="prices save">
                Save with Yearly: <span>$<span id="yearly-save">0</span></span>
            </div>
        </div>
    )
}