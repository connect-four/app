MyApp
    .controller('GameController', function($scope, $rootScope,$sce, $http, $location, $timeout, GameService, $state, $stateParams) {

        if (angular.isUndefined($stateParams.player)){
            $state.transitionTo("main");
        }else{
            if ($stateParams.player.toString()!=="1" && $stateParams.player.toString()!=="2"){
                $state.transitionTo("main");
            }else{
                $scope.playerNumber = $stateParams.player.toString();
                GameService.getPlays().then(function(response){
                    prepareBoard(response.data);

                    $timeout(function(){
                        angular.element("#loading-app").fadeOut();
                        angular.element("#container").fadeIn("slow");
                    });
                })
                .catch(function(response){
                    serverError();
                });
            }
        }

        var prepareBoard = function(plays){
            $scope.plays = plays;
            var board = new Array(6);

            for (var row=0 ; row<board.length ; row++){
                board[row] = [];
                for (var col=0 ; col<7 ; col++){
                    board[row].push("white");
                }
            }
            var count = 0;

            angular.forEach(plays, function(play){
                if (angular.isDefined(board[play[0]][play[1]])){
                    board[play[0]][play[1]] = (count%2==0) ? "red" : "yellow";
                    count++;
                }
            });

            $scope.player = (count%2==0) ? "red" : "yellow";

            $scope.board = board;

            if (plays.length>0){
                if (itsOver(plays[plays.length-1][0], plays[plays.length-1][1])){
                    loading(false);
                    $scope.winner = $scope.player;
                    console.log($scope.winner);
                }
            }else{
                if ($scope.player==="red" && $scope.playerNumber==="1" || $scope.player==="yellow" && $scope.playerNumber==="2"){
                    $scope.myTurn = true;
                }else{
                    $scope.myTurn = false;
                    loading();
                    waitMyTurn();
                }
            }

        };

        $scope.canPlay = function(row, col){
            var board = $scope.board;
            var length = board.length;
            if (angular.isDefined($scope.winner)){
                return false;
            }else if (board[row][col] !== "white"){
                return false;
            }else{
                if (row===length-1){
                    return true;
                }else{
                    var valid = true;
                    for (var x=row+1 ; x<length ; x++){
                        if (board[x][col]==="white"){
                            valid = false;
                        }
                    }
                    return valid;
                }
            }
        };

        $scope.play = function(row, col){
            $scope.board[row][col] = $scope.player;
            loading();

            GameService.save([row,col]).then(function(response){

                if (itsOver(row, col)){
                    loading(false);
                    $scope.winner = $scope.player;
                }else{
                    changePlayer();
                }

            }).catch(function(response){
                serverError();
            });
        };

        var itsOver = function(row, col){
            var board = $scope.board;
            var player = $scope.player;
            var colLength = board[row].length;
            var rowLength = board.length;
            var score;
            //checking vertically
            if (row<3){
                if (board[row+1][col]===player && board[row+2][col]===player && board[row+3][col]===player){
                    return true;
                }
            }

            //checking horizontally
            score = 0;

            for(var x=col+1 ; x<colLength ; x++){
                if (board[row][x]===player){
                    score++;
                }else{
                    break;
                }
            }
            for(var x=col-1 ; x>=0 ; x--){
                if (board[row][x]===player){
                    score++;
                }else{
                    break;
                }
            }
            if (score===3){
                return true;
            }

            //checking diagonally right
            score = 0;
            var newRow=row+1;
            for(var x=col+1 ; newRow<rowLength ; x++){
                if (board[newRow][x]===player){
                    score++;
                    newRow++;
                }else{
                    break;
                }
            }
            var newRow=row-1;
            for(var x=col-1 ; newRow>=0 ; x--){
                if (board[newRow][x]===player){
                    score++;
                    newRow--;
                }else{
                    break;
                }
            }
            if (score===3){
                return true;
            }

            //checking diagonally left
            score = 0;
            var newRow=row+1;
            for(var x=col-1 ; newRow<rowLength ; x--){
                if (board[newRow][x]===player){
                    score++;
                    newRow++;
                }else{
                    break;
                }
            }
            if (score===3){
                return true;
            }

            var newRow=row-1;
            for(var x=col+1 ; newRow>=0 ; x++){
                if (board[newRow][x]===player){
                    score++;
                    newRow--;
                }else{
                    break;
                }
            }
            if (score===3){
                return true;
            }
            return false;
        };
        var changePlayer = function(){
            $scope.player = ($scope.player==="red") ? "yellow" : "red";
            waitMyTurn();
        };

        var loading = function(bln){
            if (bln===false){
                angular.element(".loading-overlay").hide();
            }else{
                angular.element(".loading-overlay").show();
            }
        };

        var serverError = function(){
            angular.element("#loading-app").fadeOut();
            angular.element("#server-error").fadeIn("slow");
        };

        var waitMyTurn = function(){

            var playsLength = $scope.plays.length+1;

            var interval = setInterval(function(){
                GameService.getPlays().then(function(response){
                    if (response.data.length>playsLength){
                        var row = response.data[response.data.length-1][0];
                        var col = response.data[response.data.length-1][1];

                        $scope.board[row][col] = $scope.player;

                        if (itsOver(row, col)){
                            loading(false);
                            $scope.winner = $scope.player;
                        }else{
                            $scope.myTurn = true;
                            $scope.player = ($scope.playerNumber=="1") ? "red" : "yellow";
                        }
                        
                        clearInterval(interval);
                    }
                })
                .catch(function(response){

                });
            },5000);

        };
    });

