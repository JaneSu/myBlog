import FrontHome from '/src/front/home'
import AboutMe from '/src/front/aboutMe'
import ArticleInfo from '/src/front/articleInfo'
import adminLogin from 'src/admin/login'
import AdminArticleList from '/src/admin/article/list'
import AdminArticleEdit from '/src/admin/article/edit'

const routesConfig = [
	{
		path: '/',
		component: FrontHome
	},
	{
		path: '/front',
		component: '/src/front',
		children: [
			{
				path: '/front/index',
				name: 'FrontHome',
				component: FrontHome
			},
			{
				path: '/front/aboutme',
				name: 'AboutMe',
				component: AboutMe
			},
			{
				path: '/front/article',
				name: 'ArticleInfo',
				component: ArticleInfo
			}
		]
	},
	{
		path: '/admin',
		component: adminLogin,
		children: [
			{
				path: '/admin/login',
				name: 'adminLogin',
				component: adminLogin
			},
			{
				path: '/admin/article',
				name: 'article',
				component: AdminArticleList,
				children: [
					{
						path: '/admin/article/list',
						name: 'AdminArticleList',
						component: AdminArticleList
					},
					{
						path: '/admin/article/edit',
						name: 'AdminArticleEdit',
						component: AdminArticleEdit
					}
				]
			}
		]
	}
]

export default routesConfig
