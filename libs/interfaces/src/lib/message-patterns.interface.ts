


export const AppMessagePatterns={
    patients:{
         findAllPatients:`patients.query.findAll`,
         createOne:`patients.action.createOne`,
         filterPatient:`patients.action.filterPatient`,
    },
    security:{
        users:{
            findAll:'realm.query.allusers',
            createAdminUser:'realm.usermanage.createadminuser',
            createNormalUser:'realm.usermanage.createnormaluser'
        }
    },
    hipstore:{
        users:{
            findOne:'users.findone',
            saveAdminUser:'users.saveAdminUser',
            saveNormalUser:'users.saveNormalUser'
        }
    }
}


