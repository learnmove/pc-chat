
import { observable, action } from 'mobx';
import axios from 'axios';

import session from './sessions';
import helper from 'utils/helper';
import storage from 'utils/storage';

class UserInfo {
    @observable show = false;
    @observable remove = false;
    @observable conversation;
    @observable user = {};
    @observable pallet = [];

    // remove表示，是否有权限将其从group、channel、chatroom中删除
    @action async toggle(show = self.show, conversation = self.conversation, user = self.user, remove = false) {
        // if (user.UserName === session.user.User.UserName) {
        //     remove = false;
        // }

        // user = {}
        // user.UserName = 'user Name';

        self.remove = remove;
        self.show = show;
        self.user = user;
        self.conversation = conversation;

        // Try to get from cache
        var pallet = user.pallet;

        if (show) {
            if (pallet) {
                self.pallet = user.pallet;
            } else {
                // TODO 取消注释，控制用户界面背景颜色
                // pallet = await helper.getPallet(user.portrait);
                pallet = await helper.getPallet(user.xxx);

                // Cache the pallet
                self.user.pallet = pallet;
                self.pallet = pallet;
            }
        }
    }

    @action updateUser(user) {
        self.user = user;
    }

    @action async setRemarkName(name, id) {
        var auth = await storage.get('auth');
        var response = await axios.post('/cgi-bin/mmwebwx-bin/webwxoplog', {
            BaseRequest: {
                Sid: auth.wxsid,
                Uin: auth.wxuin,
                Skey: auth.skey,
            },
            CmdId: 2,
            RemarkName: name.trim(),
            UserName: id,
        });

        return +response.data.BaseResponse.Ret === 0;
    }

    @action async removeMember(roomId, userid) {
        var auth = await storage.get('auth');
        var response = await axios.post('/cgi-bin/mmwebwx-bin/webwxupdatechatroom?fun=delmember', {
            BaseRequest: {
                Sid: auth.wxsid,
                Uin: auth.wxuin,
                Skey: auth.skey,
            },
            ChatRoomName: roomId,
            DelMemberList: userid,
        });

        return +response.data.BaseResponse.Ret === 0;
    }
}

const self = new UserInfo();
export default self;
