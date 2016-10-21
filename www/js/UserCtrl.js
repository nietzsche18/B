// Contrôleur de la vue client //
angular.module('starter')

.controller('ClientCtrl', function ($scope, $http) {
    // Contrôle //
    console.log("controller ClientCtrl connected to the view Client");
    
    // Rafraîchir orderlist //
    var refreshOrder = function() {
        $http.get('/orderlist').success(function(res) {
            $scope.orderlist = res;
        });      
        $scope.order = "";        
    };         
    
    // Récupération de la database des boissons //
    $http.get('/drinklist').success(function(res) {
        // Contrôle //
        console.log("controller ClientCtrl received drinklist");
        
        // Envoi //
        $scope.drinklist = res;
    });
    
    // Récupération de la database des commandes client //
    $http.get('/orderlist').success(function(res) {
        // Contrôle //
        console.log("controller ClientCtrl received orderlist");
        
        // Envoi //
        $scope.orderlist = res;
    });    
    
    // Envoi de la commande à la database barlist du bar //
    $scope.addOrder = function(id) {
        
        // Envoi de l'id //
        var idJSON = [id];
        $http.post('/barlist',idJSON).success(function(res) {
            // Contrôle //
            console.log("command id: " + idJSON + " sent");
        });
        refreshOrder();
    };
    
    // Etat bouton terminer //
    $scope.orderState = function(id) {
        
        // Créations de variables pour simplifier l'écriture //
        var drinklist = $scope.drinklist ;
        var length = drinklist.length ;
        var idOrder, idState, idId ;
        
        // On parcours la bdd pour trouver l'élément correspondant à la commande //
        for (var i=0; i < length; i++) {
        
            // Définition des variables pour simplifier l'écriture //
            idOrder = drinklist[i] ;
            idId = idOrder._id ;
            idState = idOrder.state ;
            
            // Si c'est la bonne commande et que la commande est prête, on peut la terminer //
            if ( idStudy = id) {
                if ( idState = "Prêt" ) return true
                else return false
            }
        }
    };    
    
    // Terminer une commande //
    $scope.endOrder = function(order) {
        var id=order._id ;
        
        // Envoi de l'id //
        $http.delete('/orderlist/'+id).success(function(res) {
        // Contrôle //
        console.log("command id: " + id + " ended");
        });
        refreshOrder();
    };
});