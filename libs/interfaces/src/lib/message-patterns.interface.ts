


export const AppMessagePatterns={
    patients:{
         findAllPatients:`patients.query.findAll`,
         createOne:`patients.action.createOne`,
         filterPatient:`patients.action.filterPatient`,
    },
    security:{
        users:{
            findAll:'realm.query.allusers',
            getKCUserClientRoles:'realm.query.getKCUserRoles',
            createAdminUser:'realm.usermanage.createadminuser',
            createKCUserIfNotExists:'realm.usermanage.createUserifNotExists',
            removeUser:'realm.usermanage.removeUser',
            findOneKCUser:'realm.usermanage.findOneUser',
            removeKCUserRole:'realm.usermanage.removeRole'
        }
    },
    hipstore:{
        users:{
            findOne:'users.findone',
            saveAdminUser:'users.saveAdminUser',
            saveNormalUser:'users.saveNormalUser',
            getHSPWorkers:'users.getWorkers',
            findOneHSPWorker:'users.findOneWorker',
            addHSPWorker:'users.addWorker',
            getHSPWorkerRoles:'users.getRoles',
            assignHSPWorkerRole:'users.assignRole',
            unassignHSPWorkerRole:'users.unassignRole',
            // setProfilePic:'users.setProfilePic'
        },
        hsp:{
            findAdminuserHSP:'hsp.findAdminuserHSP',
            getAllHSP:'hsp.findAll',
            saveHSP:'hsp.save',
            findOneHSP:'hsp.findOne',
            findHSP:'hsp.search',
            deactivateHSP:'hsp.deactivate',
            setAdminuserid:'hsp.setAdminuserid',
            unAssignAdminuser:'hsp.unAssignAdminuser',
            getNextHSPSequence:'hsp.nextSequence'
        },
        hsporg:{
            getAllHSPOrg:'org.getAllHSPOrg',
            createHSPOrg:'org.createOrg',
             getHSPLocations:'org.getHSPLocations',
             findOneHSPOrg:'org.findOneHSPOrg',
             searchHSPLocations:'org.SearchHSPLocations',
             createHSPLocation:'org.createHSPLocation', 
             updateHSPLocationStatus:'org.updateLocationStatus',
             removeHSPLocation:'org.removeLocation',
             updateHSPLocation:'org.updateLocation'             
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

