
import session from './sessions';
import chat from './chat';
import addfriend from './addfriend';
import addmember from './addmember';
import members from './members';
import newchat from './newchat';
import forward from './forward';
import userinfo from './userinfo';
import contacts from './contacts';
import search from './search';
import batchsend from './batchsend';
import settings from './settings';
import snackbar from './snackbar';
import wfc from '../wfc/wfc'
import confirmImagePaste from './confirmImagePaste';

const stores = {
    session,
    chat,
    addfriend,
    addmember,
    newchat,
    userinfo,
    contacts,
    search,
    batchsend,
    settings,
    members,
    forward,
    snackbar,
    confirmImagePaste,
    wfc,
};

export default stores;
