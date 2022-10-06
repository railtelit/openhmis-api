


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
            createNormalUser:'realm.usermanage.createnormaluser',
            removeUser:'realm.usermanage.removeUser'
        }
    },
    hipstore:{
        users:{
            findOne:'users.findone',
            saveAdminUser:'users.saveAdminUser',
            saveNormalUser:'users.saveNormalUser'
        },
        hsp:{
            getAllHSP:'hsp.findAll',
            saveHSP:'hsp.save',
            findOneHSP:'hsp.findOne',
            findHSP:'hsp.search',
            deactivateHSP:'hsp.deactivate',
            setAdminuserid:'hsp.setAdminuserid',
            unAssignAdminuser:'hsp.unAssignAdminuser'
        }
    }
}

export const AppMessagePatternsTypes={
        hipstore:{
                hsp:{
                        getAllHSP:typeof {}
                }
        }
}

