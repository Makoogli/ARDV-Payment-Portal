'use client'

import React from 'react';

export function InputFormData({catalog}){
    function updatePrices(key,dif){
        let sumMonthly = 0;
        let sumYearly = 0;
        let sumYearly20 = 0;
        let sumYearly30 = 0;
        Object.entries(catalog).forEach(e=>{
            if(e[0] == key){
                document.getElementById(e[0]).value = Math.max(0,parseInt(document.getElementById(e[0]).value)+dif);
            }
            let q = parseInt(document.getElementById(e[0]).value) || 0;
            sumMonthly += q*e[1].monthly.price;
            sumYearly += q*e[1].yearly.price;
            console.log(q*e[1]);
            sumYearly20 += e[1].yearly20?q*e[1].yearly20.price:q*e[1].yearly.price;
            sumYearly30 += e[1].yearly30?q*e[1].yearly30.price:q*e[1].yearly.price;
        });
        document.getElementById('price-monthly').innerText = sumMonthly;
        document.getElementById('price-yearly').innerText = sumYearly;
        document.getElementById('price-yearly20').innerText = sumYearly20;
        document.getElementById('price-yearly30').innerText = sumYearly30;
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
                <div className="price">
                    Yearly20: $<span id="price-yearly20">0</span><input type="radio" name="paymentFrequency" value="yearly20"/>
                </div>
                <div className="price">
                    Yearly30: $<span id="price-yearly30">0</span><input type="radio" name="paymentFrequency" value="yearly30"/>
                </div>
            </div>
            <div id="saveYearly" className="prices save">
                Save with Yearly: <span>$<span id="yearly-save">0</span></span>
            </div>
        </div>
    )
}