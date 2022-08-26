import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EMPTY, Observable, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaI18n(): Observable<void> {
    const defaultLang = this.i18n.defaultLang;
    return this.i18n.loadLangData(defaultLang).pipe(
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return [];
      }),
      map((langData: NzSafeAny) => {
        this.i18n.use(defaultLang, langData);
      })
    );
  }

  private getCurrent(userId: string): Observable<any> {
    return zip(
      this.httpClient.post('http://127.0.0.1:4000/api/user/menus', { userId }),
      this.httpClient.post('http://127.0.0.1:4000/api/user/permission', { userId })
    ).pipe(
      map(([menus, permission]: [any, any]) => {
        this.aclService.setFull(false);
        this.aclService.setRole(permission.data);
        this.menuService.add(menus.data); // 初始化菜单
        // this.settingService.setApp(appData.app);
        // 用户信息：包括姓名、头像、邮箱地址
        // this.settingService.setUser(appData.user);
        // 设置页面标题的后缀
        // this.titleService.default = '';
        // this.titleService.suffix = appData.app.name;
      })
    );
  }

  load(): Observable<void> {
    return this.viaI18n().pipe(
      switchMap(() => {
        const data: any = this.tokenService.get();
        if (data && data.token) {
          return this.getCurrent(data.userInfo.id);
        }
        return EMPTY;
      })
    );
  }

  // load(): Observable<void> {
  //   const defaultLang = this.i18n.defaultLang;
  //   return zip(
  //     this.i18n.loadLangData(defaultLang),
  //     this.httpClient.post('http://127.0.0.1:4000/api/role/getMenuListById', { roleIds: ['85babd88-8e11-4838-b2cf-38de53ae5548'] })
  //   ).pipe(
  //     // return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('assets/tmp/app-data.json')).pipe(
  //     // 接收其他拦截器后产生的异常消息
  //     catchError(res => {
  //       console.warn(`StartupService.load: Network request failed`, res);
  //       setTimeout(() => this.router.navigateByUrl(`/exception/500`));
  //       return [];
  //     }),
  //     map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
  //       // setting language data
  //       this.i18n.use(defaultLang, langData);
  //       // 应用信息：包括站点名、描述、年份
  //       // this.settingService.setApp(appData.app);
  //       // 用户信息：包括姓名、头像、邮箱地址
  //       // this.settingService.setUser(appData.user);
  //       // ACL：设置权限为全量
  //       this.aclService.setFull(false);
  //       const data: any = this.tokenService.get();
  //       this.aclService.setRole(data.userInfo.acls);
  //       console.log(data.userInfo.acls);

  //       // this.menuService.resume();
  //       // console.log(this.aclService.data);

  //       // 初始化菜单
  //       this.menuService.add(appData.data);
  //       // 设置页面标题的后缀
  //       this.titleService.default = '';
  //       // this.titleService.suffix = appData.app.name;
  //     })
  //   );
  // }
}
