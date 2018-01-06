            var left = $('#coolDiv').offset().left;
            var windowHeight = $(window).height();
            var divHeight = $('#coolDiv').height();
            var newPos = windowHeight - divHeight;
            var divSize;
            var flag;
            var gameOver;
            var sum = 0;
            var divNum = 0;
            var thisDiv = $('#coolDiv');
            var np;
            
            var s = 0xb5ad4eceda1ce2a9;
            var x = 0;
            var w = 0;
            
            function msws(){
                x *= x;
                
                x += (w += s);
             
                return x = (x>>>32) || (x<<32);
            }
            
            function calcNewPos(heightLarge){
                var newPosLarge = windowHeight - heightLarge;
                return newPosLarge;
            }
            
            
            
            function calcNewSize(divNum){
                $('#coolDiv').css({
                    width: '+=' + (divNum) + 'px',
                    height: '+=' + (divNum) + 'px'
                });
            }
            
            function calcScore(score){
                $('#score').html(score);
            }

            
            $(document).keypress(function(e){
                if (e.which == 13){
                    $('#letsPlay').hide();
                    $valDiv = $('<span/>').html(sum).css({
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }).appendTo('#coolDiv');
                    calcScore(0);
                    makeDiv();     
                }
            });
            
            function makeDiv(){
//                flag = false;
//                divSize  = ((Math.random()*50) + 20).toFixed();
                divSize = Math.floor((Math.random() * 40) + 20);
                var posx = Math.floor((Math.random() * ($('#play').width() - divSize))).toFixed();
                var posy = Math.floor((Math.random() * ($('#play').height() - divSize))).toFixed();
                var colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'];    
                var divColor = colors[Math.floor(Math.random() * 6)];
                
                
                
                $newdiv = $('<div/>').css({
                    width: divSize+'px',
                    height: divSize+'px',
                    backgroundColor: divColor,
                    borderRadius: '3px'
                });
                
                
                if($newdiv.width() < 30){
                    divNum = 1;
                }
                else if($newdiv.width() < 40){
                    divNum = 2;
                }
                else if($newdiv.width() < 50){
                    divNum = 3;
                }
                else
                    divNum = 4;
                
                
                
                $newNum = $('<span/>').html(divNum).css({
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }).appendTo($newdiv);
                
                
                var ra = Math.floor(Math.random() * 4);
                
                /*.fadeOut(1000, function(){
                            $(this).remove();
                            makeDiv();
                        });*/
            
                
                
                if(!flag){            
                   switch(ra){
                        case 0:
                            flag = true;
                            $newdiv.css({
                            position: 'absolute',
                            left: 0,
                            top: posy+'px',
                            display: 'none'
                            }).appendTo('#play').fadeIn(200).delay('slow');
                            break;
                        case 1:
                            flag = true;
                            $newdiv.css({
                            position: 'absolute',
                            right: 0,
                            top: posy+'px',
                            display: 'none'
                            }).appendTo('#play').fadeIn(200).delay('slow');
                            break;
                        case 2:
                            flag = true;
                            $newdiv.css({
                            position: 'absolute',
                            left: posx+'px',
                            top: 0,
                            display: 'none'
                            }).appendTo('#play').fadeIn(200).delay('slow');
                            break;
                        case 3:
                            flag = true;
                            $newdiv.css({
                            position: 'absolute',
                            left: posx+'px',
                            bottom: 0,
                            display: 'none'
                            }).appendTo('#play').fadeIn(200).delay('slow');
                            break;
                        default:
                            return;

                    } /* switch statement*/
                } /*If $newDiv.length == 0*/
                else
                    return false;
                
                
                
            }
            
            
            $(document).keydown(function(e){
                switch(e.which) {
                    case 37: // left
                        np = calcNewPos(thisDiv.height());
                        $('#coolDiv').animate({right:np}, 'fast',
                            function(){
                                $('#coolDiv').css({
                                    left: 0,
                                    right: 'auto'
                                });
                        });
                    
                        if(($newdiv.position().top === 0) && (thisDiv.position().top === 0)){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        
                        }
                        
                        else if(($newdiv.offset().top + $newdiv.height() >= windowHeight -5) && ($('#coolDiv').offset().top + thisDiv.height() >= ($(window).height() - 5))){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        }
                        
                    
                        break;
                        
                        

                    case 38: // up
                        
                        np = calcNewPos(thisDiv.height());
                        $('#coolDiv').animate({bottom:np}, "fast", function(){
                            $('#coolDiv').css({
                                top: 0,
                                bottom: 'auto'
                            });
                        });

                        if((($newdiv.offset().left + $newdiv.width()) >= $('#play').width()) && ((thisDiv.offset().left + thisDiv.width()) >= $('#play').width() ) ){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        }
                        else if(($newdiv.position().left === 0) && (thisDiv.position().left == 0)){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        }
 
                        break;

                    case 39: // right
                        np = calcNewPos(thisDiv.height());
                        $('#coolDiv').animate({left:np}, "fast", 
                        function(){
                            $('#coolDiv').css({
                                right: 0,
                                left: 'auto'
                            });
                        });
                        
                        if(($newdiv.position().top === 0) && (thisDiv.position().top === 0)){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        }
                        
                        else if((($newdiv.offset().top + $newdiv.height()) >= windowHeight -5) && (thisDiv.offset().top + thisDiv.height()) >= (windowHeight - 5)){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        }
                        
                        
                        break;

                    case 40: // down     
                       np = calcNewPos(thisDiv.height());
                       $('#coolDiv').animate({top:np}, "fast", function(){
                           $('#coolDiv').css({
                              bottom: 0,
                              top: 'auto'
                           });
                       });
                        
                        if(($newdiv.position().left === 0) && (thisDiv.position().left === 0)){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();
                        }
                        else if((($newdiv.offset().left + $newdiv.width()) >= $('#play').width()) && ((thisDiv.offset().left + thisDiv.width()) >= $('#play').width())){
                            $newdiv.remove();
                            calcNewSize(divNum);
                            sum = sum + divNum;
                            $($valDiv).html(sum);
                            calcScore(sum);
                            flag = false;
                            makeDiv();              
                        }
                        break;

                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });