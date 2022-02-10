import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LayoutComponent } from './components/layout.component';

const routes: Routes = [
  { 
    path : '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('@main/components/dashboard/dashboard.module').then(m=>m.DashboardModule)},
      { path: 'restaurants', loadChildren: () => import('@main/components/restaurants/restaurants.module').then(m=>m.RestaurantsModule)},
      { path: 'cuisines', loadChildren: () => import('@main/components/cuisines/cuisines.module').then(m=>m.CuisinesModule)},
      { path: 'clusters', loadChildren: () => import('@main/components/clusters/clusters.module').then(m=>m.ClustersModule)},
      { path: 'category', loadChildren: () => import('@main/components/category/category.module').then(m=>m.CategoryModule)},
      { path: 'customers', loadChildren: () => import('@main/components/customers/customers.module').then(m=>m.CustomersModule)},
      { path: 'menus', loadChildren: () => import('@main/components/menus/menus.module').then(m=>m.MenusModule)},
      { path: 'transactions', loadChildren: () => import('@main/components/transaction/transaction.module').then(m=>m.TransactionModule)},
      { path: 'terms', loadChildren: () => import('@main/components/terms/terms.module').then(m=>m.TermsModule)},
      { path: 'paymentmang', loadChildren: () => import('@main/components/payment/payment.module').then(m=>m.PaymentModule)},
      { path: 'helppayment', loadChildren: () => import('@main/components/helppayment/helppayment.module').then(m=>m.HelppaymentModule)},
      { path: 'refunds', loadChildren: () => import('@main/components/refund/refund.module').then(m=>m.RefundModule)},
      { path: 'adminrefund', loadChildren: () => import('@main/components/adminrefund/adminrefund.module').then(m=>m.AdminrefundModule)},
      { path: 'collective', loadChildren: () => import('@main/components/collective/collective.module').then(m=>m.CollectiveModule)},
      { path: 'allorders', loadChildren: () => import('@main/components/allorders/allorders.module').then(m=>m.AllordersModule)},
      { path: 'pending-orders', loadChildren: () => import('@main/components/pending-order/pending-order.module').then(m=>m.PendingOrderModule)},
      { path: 'restaurant-approvals', loadChildren: () => import('@main/components/approvals/approvals.module').then(m=>m.ApprovalsModule)},
      { path: 'Information/:menu_id', loadChildren: () => import('@main/components/menus/menu-detail/menu-detail.module').then(m=>m.MenuDetailModule)},
      { path: 'generate-ticket', loadChildren: () => import('@main/components/ticket-system/ticket-system.module').then(m=>m.TicketSystemModule)},
      { path: 'customer-grievance', loadChildren: () => import('@main/components/customer-grievance/customer-grievance.module').then(m=>m.CustomerGrievanceModule)},
      { path: 'coupon', loadChildren: () => import('@main/components/coupon/coupon.module').then(m=>m.CouponModule)},
      { path: 'offer', loadChildren: () => import('@main/components/offer/offer.module').then(m=>m.OfferModule)},
      { path: 'header-content', loadChildren: () => import('@main/components/header-content/header-content.module').then(m=>m.HeaderContentModule)},
      { path: 'featuredRestaurants', loadChildren: () => import('@main/components/featuredRestaurants/featuredRestaurants.module').then(m=>m.FeaturedRestaurantsModule)},
      { path: 'role-management', loadChildren: () => import('@main/components/role/role.module').then(m=>m.RoleModule)},
      { path: 'user-role', loadChildren: () => import('@main/components/user/user.module').then(m=>m.UserModule)},
      { path: 'user-detail/:id', loadChildren: () => import('@main/components/user/user-detail/user-detail.module').then(m=>m.UserDetailModule)},

    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
