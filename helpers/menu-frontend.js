 const getMenuFrontend = (role = 'USER_ROLE') => {
    const menu = [
        {titulo: 'Principal', 
        icon:'mdi mdi-gauge',
        submenu:[
          {titulo: 'Dashboard', url:'/'},
          {titulo: 'ProgressBar', url:'progress'},
          {titulo: 'Graficas', url:'grafica1'},
          {titulo: 'Promesas', url:'promesas'},
          {titulo: 'RXJS', url:'rxjs'},
        ]
        },
        
        {titulo: 'Mantenimientos', 
        icon:'mdi mdi-folder-lock-open',
        submenu:[
         // {titulo: 'Usuarios', url:'usuarios'},
          {titulo: 'Hospitales', url:'hospitales'},
          {titulo: 'Medicos', url:'medicos'},
        
        ]
        },
        ];
        if(role === 'ADMIN_ROLE'){
            menu[1].submenu.unshift({titulo: 'Usuarios', url:'usuarios'})
        }
        return menu;
}

module.exports = {
    getMenuFrontend
}