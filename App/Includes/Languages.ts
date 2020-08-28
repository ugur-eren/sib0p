import { NativeModules, Platform } from 'react-native'
import Config from './Config'
import Types from './Types/Types'

const defaultLanguage = Config.defaultLanguage as any
let selectedLanguage: Types.SupportedLanguages = defaultLanguage

const deviceLanguage: string =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier

if (deviceLanguage === 'tr_TR' || deviceLanguage === 'tr' || deviceLanguage.toLowerCase().startsWith('tr')) {
	selectedLanguage = 'tr'
} else if (deviceLanguage === 'en_US' || deviceLanguage === 'en' || deviceLanguage.toLowerCase().startsWith('en')) {
	selectedLanguage = 'en'
} else if (deviceLanguage === 'ru_RU' || deviceLanguage === 'ru' || deviceLanguage.toLowerCase().startsWith('ru')) {
	selectedLanguage = 'ru'
} else if (deviceLanguage === 'de_DE' || deviceLanguage === 'de' || deviceLanguage.toLowerCase().startsWith('de')) {
	selectedLanguage = 'de'
} else {
	selectedLanguage = 'tr'
}

const Languages: Types.Languages = {
	tr: {
		code: 'tr',
		langName: 'Türkçe',
		language: 'Dil',
		success: 'Başarılı!',
		error: 'Hata!',
		ok: 'Tamam',
		unknown_error: 'Maalesef, Bilinmeyen bir hata ile karşılaştık. ',
		share_text: "sib0p'da paylaşılan bu postu seveceğini düşünüyorum: ",
		share: 'Paylaş',
		report: 'Şikayet Et',
		delete: 'Sil',
		cancel: 'İptal',
		delete_post: 'Gönderiyi Sil',
		report_dialog: 'Bu gönderiyi şikayet etmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
		delete_dialog: 'Bu gönderiyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
		no_post_error: 'Gönderi bulunamadı, silinmiş olabilir..',
		no_comment_error: 'Yorum bulunamadı, silinmiş olabilir..',
		no_user_error: 'Bu kullanıcı bulunamadı. Kullanıcı adı değişmiş olabilir.',
		no_comments: 'Hiç yorum yok',
		comments_count: 'Yorum',
		video_load_error: "Video yüklenemedi{'\n'}Tekrar denemek için dokunun",
		post_auth_error: 'Bu gönderiyi, sadece gönderiyi paylaşan kullanıcı silebilir.',
		report_success: 'Gönderi başarılı bir şekilde raporlandı. Yöneticilerimiz isteğinizi en kısa sürede inceleyecektir. Rapor tipi: ',
		report_success_hide: 'Bu gönderiyi gizlemek ister misiniz? Bu işlem geri alınamaz ve bu gönderiyi bir daha asla göremezsiniz.',
		post_share_success: 'Gönderiniz başarıyla paylaşıldı.',
		post_share_error: 'Gönderiniz paylaşırken bilinmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.',
		wrong_username_error: 'Hatalı bir kullanıcı adı ile işlem yapmaya çalışıyorsunuz. Lütfen daha sonra tekrar deneyiniz.',
		follow: 'Takip Et',
		unfollow: 'Takipten Çık',
		username_empty: 'Kullanıcı adı boş olamaz.',
		username_less: 'Kullanıcı adı 4 karakterden az olamaz.',
		password_empty: 'Şifreniz boş olamaz.',
		couldnt_take_login_info: 'Giriş bilgileri alınamadı. Lütfen daha sonra tekrar deneyiniz.',
		wrong_username: 'Lütfen kullanıcı adınızın sadece ingilizce karakterler, sayı, nokta ve çizgilerden oluştuğundan emin olunuz.',
		no_user: 'Böyle bir kullanıcı bulunamadı. Lütfen kullanıcı adınızı kontrol ediniz.',
		wrong_password: 'Yanlış Parola girdiniz. Lütfen parolanızı kontrol ediniz.',
		username: 'Kullanıcı Adı',
		password: 'Parola',
		password_again: 'Parola Tekrar',
		login: 'Giriş Yap',
		have_no_account: 'Henüz bir hesabın yok mu?',
		register: 'Kayıt Ol',
		have_you_forgot_password: 'Şifreni mi unuttun?',
		password_reset: 'Şifre Sıfırlama',
		must_agree_agreement: 'Hizmet ve Kullanım koşullarını, Veri ve Gizlilik Politikasını kabul etmeniz gerekmektedir.',
		email_empty: 'E-Posta boş olamaz.',
		email_wrong: 'E-Posta Adresiniz doğru değil.',
		password_less: 'Şifreniz 5 karakterden az olamaz.',
		password_not_match: 'Şifreleriniz eşleşmemektedir.',
		captcha_empty: 'Doğrulama Kodu boş olamaz.',
		email_in_use: 'Bu E-Posta adresi başka bir kullanıcı tarafından kullanılmaktadır.',
		expired_captcha: 'Güvenlik kodu doğrulama süresi geçti. Lütfen güvenlik kodunu tekrar giriniz.',
		some_empty: 'Bazı alanları doldurmamışsınız. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.',
		username_in_use: 'Bu kullanıcı adı başka bir kullanıcı tarafından kullanılmaktadır.',
		username_not_allowed: 'Bu kullanıcı adı kullanılamaz.',
		wrong_captcha: 'Doğrulama kodu hatalı. Lütfen tekrar deneyiniz.',
		terms_of_use: 'Kullanım Koşulları',
		privacy_policy: 'Veri ve Gizlilik Politikası',
		name: 'İsim',
		surname: 'Soyisim',
		email: 'E-Posta',
		captcha: 'Güvenlik Kodu',
		have_an_account: 'Hesabın var mı ?',
		just_now: 'Biraz önce',
		seconds_ago: ' saniye önce',
		minutes_ago: ' dakika önce',
		hours_ago: ' saat önce',
		days_ago: ' gün önce',
		weeks_ago: ' hafta önce',
		months_ago: ' ay önce',
		years_ago: ' yıl önce',
		no_post_data: 'Gönderi bilgisi gönderilemedi. Lütfen daha sonra tekrar deneyiniz.',
		same_comment_error: 'Bu post için aynı yorumu daha önce yapmışsınız.',
		comment_auth_error: 'Bu yorumu, sadece yorumu paylaşan kullanıcı silebilir.',
		no_comments_made: 'Bu gönderiye hiç yorum yapılmamış.',
		comments: 'Yorumlar',
		your_comment: 'Yorumunuz...',
		send: 'Gönder',
		delete_comment: 'Yorumu Sil',
		delete_comment_dialog: 'Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
		unknown: 'Bilinmiyor',
		no_connection: 'Sunucu ile iletişim kurulamadı. \n\n Lütfen internet bağlantığınızı kontrol ediniz ve tekrar deneyiniz.',
		try_again: 'Tekrar Dene',
		notifications: 'Bildirimler',
		notif_commented: 'senin gönderine yorum yaptı',
		notif_liked_comment: 'senin yorumunu beğendi',
		notif_followed: 'seni takip etmeye başladı',
		notif_liked_post: 'senin gönderini beğendi',
		notif_tagged_on_comment: 'seni bir yorumda etiketledi',
		notif_tagged_on_post: 'seni bir gönderide etiketledi',
		notif_unfollow: 'seni takipten çıkardı',
		notif_warning: 'Bir uyarı aldınız: ',
		no_notifs: 'Son 3 gün içinde okunmamış bildiriminiz bulunmamaktadır',
		no_follows: 'Bu kullanıcının takip ettiği kimse yok.',
		no_followers: 'Bu kullanıcıyı takip eden kimse yok.',
		search: 'Arama',
		no_search_results: 'Arama sonucu bulunamadı',
		blocked_users: 'Engellenen Kullanıcılar',
		no_blocked_users: 'Hiç engellenen kullanıcı yok.',
		old_password_empty: 'Eski Şifreniz boş olamaz.',
		new_password_empty: 'Yeni Şifreniz boş olamaz.',
		new_password_less: 'Yeni Şifreniz 5 karakterden az olamaz.',
		old_password: 'Eski Şifreniz',
		new_password: 'Yeni Şifreniz',
		new_password_again: 'Yeni Şifreniz Tekrar',
		change_password: 'Şifre Değiştir',
		change_password_success: 'Şifreniz başarıyla güncellendi.',
		edit_profile: 'Profili Düzenle',
		bio: 'Hakkında',
		edit_profile_success: 'Profiliniz başarıyla güncellendi.',
		theme: 'Tema',
		logout: 'Çıkış Yap',
		logout_dialog: 'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
		theme_light: 'Aydınlık',
		theme_dark: 'Karanlık',
		theme_timed: 'Zaman Ayarlı',
		theme_system: 'Sistem Varsayılanı',
		cropper_title: 'Resim Boyutunu Ayarlayınız',
		loading: 'Yükleniyor...',
		choose: 'Seç',
		image_size_more: "Seçilen dosya boyutu 20MB'dan fazla olamaz.",
		must_choose: 'En az bir medya seçmeli ya da mesaj yazmalısınız.',
		waiting_to_post: 'Şu an paylaşılmakta olan bir gönderiniz mevcut. Yeni bir gönderi paylaşmadan önce yüklemenin tamamlanmasını bekleyiniz',
		perm_settings_error: 'İzin ayarları açılırken bir sorun oluştu.',
		share_post: 'Gönderi Paylaş',
		file_perm_unavailable:
			'Devam edebilmeniz için dosya izinine ihtiyacımız var. \n Fakat cihazınız dosya izinlerini desteklememektedir. \n Bunun bir hata olduğunu düşünüyorsanız bizimle iletişime geçiniz.',
		file_perm_ask: 'Devam edebilmeniz için dosya izinine ihtiyacımız var. \n\n Dosya izinlerini sadece gönderi içeriği için kullanmaktayız.',
		file_perm_open_settins: 'Uygulama Ayarlarını Aç',
		message: 'Mesaj',
		tags: 'Etiketler',
		share_dialog: 'Gönderinizi paylaşmak istediğinize emin misiniz?',
		user_block_success: 'Kullanıcı başarılı bir şekilde engellendi. Kullanıcının engelini ayarlar sayfasından kaldırabilirsiniz.',
		user_unblock_success: 'Kullanıcının engeli başarılı bir şekilde kaldırıldı.',
		pp_photo_success: 'Profil fotoğrafı başarıyla güncellendi.',
		bg_photo_success: 'Arkaplan fotoğrafı başarıyla güncellendi.',
		no_image: 'Fotoğraf seçilmedi. Lütfen tekrar deneyiniz.',
		file_not_supported: 'Yüklediğiniz dosya formatı desteklenmemektedir. Lütfen farklı bir dosya ile tekrar deneyiniz.',
		file_open_error: 'Dosya açılırken bir sorun oluştu. Lütfen dosya izinlerini kontol ediniz ve tekrar deneyiniz.',
		follows: 'Takip',
		followers: 'Takipçi',
		no_posts: 'Hiç post bulunamadı',
		not_found: 'Bulunamadı',
		user_not_found: 'Bu kullanıcı bulunamadı. Kullanıcı adı değişmiş olabilir.',
		block_user_dialog:
			'Bu kullanıcıyı engellemek istediğinize emin misiniz? Engeli kaldırana kadar bu kullanıcı ile ilişkili gönderileri ve yorumları göremezsiniz.',
		block: 'Engelle',
		check_network: 'Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.',
		settings: 'Ayarlar',
		explore: 'Keşfet',
		memelord: 'MemeLord',
		profile: 'Profil',
		posts: 'Gönderiler',
		unblock: 'Engeli Kaldır',
		spam: 'Spam',
		abusive: 'Aşırı Küfürlü',
		objectionable: 'Sakıncalı',
		sexual: 'Cinsel İçerik',
		already_reported: 'Bu gönderiyi daha önce zaten şikayet etmiştiniz.',
		hide: 'Gizle',
		not_reported: 'Bir gönderiyi gizlemek için önce şikayet etmeniz gerekmektedir.',
		already_hidden: 'Bu gönderiyi daha önce zaten gizlediniz.',
		report_user_dialog:
			"Bu kullanıcıyı şikayet etmek istediğinize emin misiniz? Bu işlem geri alınamaz. Eğer sadece paylaşılan içeriği beğenmiyorsanız lütfen 'Engelle' seçeneğini seçiniz.",
		user_report_success: 'Kullanıcı başarıyla şikayet edildi. Yöneticilerimiz isteğinizi en kısa sürede inceleyecektir.',
		comment_empty: 'Yorumunuz boş olamaz.',
		too_fast_action: 'Biraz hızlı işlem yapıyorsunuz. Lütfen daha sonra tekrar deneyiniz.',
		media: 'Medya',
		detail: 'Detay',
		picture: 'Resim',
		video: 'Video',
		sponsored: 'Sponsorlu',
		image_thin: 'Yüklediğiniz resim çok ince veya çok uzun. Boyut oranı en fazla 1:2 veya 2:1 olabilir.',
	},
	en: {
		code: 'en',
		langName: 'English',
		language: 'Language',
		success: 'Success!',
		error: 'Error!',
		ok: 'Ok',
		unknown_error: 'Unfortunately, we have encountered an unknown error. ',
		share_text: "I think you'll love the post i've seen on Sib0p: ",
		share: 'Share',
		report: 'Report',
		delete: 'Delete',
		cancel: 'Cancel',
		delete_post: 'Delete Post',
		report_dialog: 'Are you sure you want to report this post? This action cannot be undone.',
		delete_dialog: 'Are you sure you want to delete this post? This action cannot be undone.',
		comments_count: 'Comments',
		no_post_error: "Post couldn't be found, it might be deleted..",
		no_user_error: "User couldn't be found, it might be changed it's username",
		no_comment_error: "Comment couldn't be found, it might be deleted..",
		no_comments: 'There are no comments',
		video_load_error: "Video couldn't be loaded{'\n'}Press to try again",
		post_auth_error: 'Only the author of the post can delete the post.',
		report_success: 'This post has been successfully reported. Our moderators will investigate your request. Report type: ',
		report_success_hide: 'Do you want to hide this post? This action cannot be undone and you can not see this post again.',
		post_share_success: 'Your post has been successfully shared.',
		post_share_error: 'There has been an unknown error while sharing your post. Please try again later.',
		wrong_username_error: 'You are trying to make a request with wrong username. Please try again later.',
		follow: 'Follow',
		unfollow: 'Unfollow',
		username_empty: 'Username cannot be empty.',
		username_less: 'Username cannot be less than 4 characters',
		password_empty: 'Password cannot be empty.',
		couldnt_take_login_info: "Login information couldn't be found. Please try again later.",
		wrong_username: 'Your username can only contain english characters, numbers, dots or dashes.',
		no_user: 'There are no users with this username. Please check your username and try again.',
		wrong_password: 'You have entered wrong password. Please check your password and try again.',
		username: 'Username',
		password: 'Password',
		password_again: 'Password Again',
		login: 'Login',
		have_no_account: "You don't have an account?",
		register: 'Register',
		have_you_forgot_password: 'Have you forgot your password?',
		password_reset: 'Password Reset',
		must_agree_agreement: 'You must agree our EULA, Terms of Use and Privacy Policy.',
		email_empty: 'E-Mail cannot be empty.',
		email_wrong: 'Your E-Mail address is not correct.',
		password_less: 'Password cannot be less than 5 characters',
		password_not_match: 'Your passwords does not match.',
		captcha_empty: 'Captcha cannot be empty.',
		email_in_use: 'This E-Mail address is already being used by another user.',
		expired_captcha: 'Captcha timeout has expired. Please try again with new captcha code.',
		some_empty: 'You did not fill some areas, please check your information and try again.',
		username_in_use: 'This username is already being used by another user.',
		username_not_allowed: 'This username is not allowed to use.',
		wrong_captcha: 'Captcha code is wrong. Please try again.',
		terms_of_use: 'EULA and Terms of Use',
		privacy_policy: 'Data and Privacy Policy',
		name: 'Name',
		surname: 'Surname',
		email: 'E-Mail',
		captcha: 'Captcha',
		have_an_account: 'Do you have an account?',
		just_now: 'Just now',
		seconds_ago: ' seconds ago',
		minutes_ago: ' minutes ago',
		hours_ago: ' hours ago',
		days_ago: ' days ago',
		weeks_ago: ' weeks ago',
		months_ago: ' months ago',
		years_ago: ' years ago',
		no_post_data: 'Post data could not be sent. Please try again later.',
		same_comment_error: 'You already made the same comment for this post.',
		comment_auth_error: 'Only the author of the comment can delete the comment.',
		no_comments_made: 'There are no comments made for this post.',
		comments: 'Comments',
		your_comment: 'Your comment...',
		send: 'Send',
		delete_comment: 'Delete Comment',
		delete_comment_dialog: 'Are you sure you want to delete this comment? This action cannot be undone.',
		unknown: 'Unknown',
		no_connection: 'Could not connect to server. \n\n Please check your network connection and try again.',
		try_again: 'TRY AGAIN',
		notifications: 'Notifications',
		notif_commented: 'made a comment on your post',
		notif_liked_comment: 'liked your comment',
		notif_followed: 'started to follow you',
		notif_liked_post: 'liked your post',
		notif_tagged_on_comment: 'tagged you on a comment',
		notif_tagged_on_post: 'tagged you on a post',
		notif_unfollow: 'unfollowed you',
		notif_warning: 'You got an warning: ',
		no_notifs: "You don't have any notifications in the last 3 days",
		no_follows: 'This user does not follow anyone.',
		no_followers: 'This user does not have any followers.',
		search: 'Search',
		no_search_results: 'No search results',
		blocked_users: 'Blocked Users',
		no_blocked_users: 'There are no blocked users',
		old_password_empty: 'Old Password cannot be empty.',
		new_password_empty: 'New Password cannot be empty.',
		new_password_less: 'New Password cannot be less than 5 characters.',
		old_password: 'Current Password',
		new_password: 'New Password',
		new_password_again: 'New Password Again',
		change_password: 'Change Password',
		change_password_success: 'Your password has successfully changed',
		edit_profile: 'Edit Profile',
		bio: 'Bio',
		edit_profile_success: 'Your profile has successfully updated.',
		theme: 'Theme',
		logout: 'Logout',
		logout_dialog: 'Are you sure you want to logout from your account?',
		theme_light: 'Light',
		theme_dark: 'Dark',
		theme_timed: 'Timed',
		theme_system: 'System Default',
		cropper_title: 'Set Image Size',
		loading: 'Loading...',
		choose: 'Choose',
		image_size_more: 'Chosen file size cannot be more than 20MBs.',
		must_choose: 'You must choose a file or enter a message.',
		waiting_to_post:
			'You already have an upload waiting to be completed. You must wait for other post to be completed in order to upload a new post.',
		perm_settings_error: 'There has been an error while opening permissions settingsç.',
		share_post: 'Share Post',
		file_perm_unavailable:
			'We need file access permission in order to continue. \n But it seems like your device does not support file permission. \n If you think this is a mistake, please contact us.',
		file_perm_ask:
			'We need file access permission in order to continue. \n\n File access permission is used only to select and post pictures or videos.',
		file_perm_open_settins: 'Open Application Settings',
		message: 'Message',
		tags: 'Tags',
		share_dialog: 'Are you sure you want to share your post?',
		user_block_success: 'User has been successfully blocked. You can unblock this user in the settings page.',
		user_unblock_success: 'User has been successfully unblocked.',
		pp_photo_success: 'Profile Photo has been successfully changed.',
		bg_photo_success: 'Background Photo has been successfully changed.',
		no_image: 'No images selected. Please try again.',
		file_not_supported: 'Chosen file format is not supported. Please try again with a different file.',
		file_open_error: 'There has been an error while opening the file. Please check your file permissions and try again.',
		follows: 'Follows',
		followers: 'Followers',
		no_posts: 'There are no posts',
		not_found: 'Not Found',
		user_not_found: "This user could not be found. It might be changed it's username",
		block_user_dialog:
			'Are you sure you want to block this user? You can no longer see any posts or comments related to this user until you unblock this user.',
		block: 'Block',
		check_network: 'Please check your network connection and try again.',
		settings: 'Settings',
		explore: 'Explore',
		memelord: 'MemeLord',
		profile: 'Profile',
		posts: 'Posts',
		unblock: 'Unblock',
		spam: 'Spam',
		abusive: 'Abusive',
		objectionable: 'Objectionable',
		sexual: 'Sexual Content',
		already_reported: 'You have already reported this post.',
		hide: 'Hide',
		not_reported: 'You have to report the post before hiding it.',
		already_hidden: 'You already hide this post.',
		report_user_dialog:
			"Are you sure you want to report this user? This action cannot be undone. If you just don't like the content that this user shares, please select 'Block' option.",
		user_report_success: 'User has successfully reported. Our moderator team will investigate your request as soon as possible.',
		comment_empty: 'Your comment cannot be empty.',
		too_fast_action: 'Biraz hızlı işlem yapıyorsunuz. Lütfen daha sonra tekrar deneyiniz.',
		media: 'Media',
		detail: 'Detail',
		picture: 'Picture',
		video: 'Video',
		sponsored: 'Sponsored',
		image_thin: 'The image you have uploaded is too thin or too thick. Image ratio must be between 1:2 and 2:1.',
	},
	ru: {
		code: 'ru',
		langName: 'русский',
		language: 'Язык',
		success: 'Успешно!',
		error: 'Ошибка!',
		ok: 'да',
		unknown_error: 'К сожалению, произошла неизвестная ошибка. ',
		share_text: 'я думаю, вам понравится этот пост, разделяемый в sib0p: ',
		share: 'Поделитесь',
		report: 'Жаловаться',
		delete: 'Удалить',
		cancel: 'Отмена',
		delete_post: 'Удалить Сообщение',
		report_dialog: 'Вы уверены, что хотите пожаловаться на этот пост? Этот процесс не может быть отменен.',
		delete_dialog: 'Вы уверены, что хотите удалить эту запись? Это действие не может быть отменено.',
		no_post_error: 'Сообщение не найдено и, возможно, было удалено..',
		no_comment_error: 'Комментарии не найдены, возможно, они были удалены..',
		no_user_error: 'Этот пользователь не найден. Имя пользователя, возможно, изменилось.',
		no_comments: 'Никаких комментариев вообще',
		comments_count: 'Отзыв',
		video_load_error: "Не удалось загрузить видео{'\n'}Нажмите, чтобы повторить попытку",
		post_auth_error: 'Только пользователь, поделившийся публикацией, может удалить это сообщение.',
		report_success: 'Сообщение было успешно отправлено. Наши менеджеры рассмотрят ваш запрос в кратчайшие сроки. Тип отчета: ',
		report_success_hide: 'Хотели бы вы скрыть этот пост? Это действие необратимо, и вы больше никогда не увидите этот пост.',
		post_share_success: 'Ваш пост был успешно опубликован.',
		post_share_error: 'При публикации вашего сообщения возникла неизвестная проблема. Пожалуйста, попробуйте позже.',
		wrong_username_error: 'Вы пытаетесь работать с неправильным именем пользователя. Пожалуйста, попробуйте позже.',
		follow: 'следить',
		unfollow: 'Отписаться',
		username_empty: 'Имя пользователя не может быть пустым.',
		username_less: 'Имя пользователя не может быть короче 4 символов.',
		password_empty: 'Ваш пароль не может быть пустым.',
		couldnt_take_login_info: 'Не удалось получить данные для входа. Пожалуйста, попробуйте позже.',
		wrong_username: 'Убедитесь, что ваше имя пользователя состоит только из английских символов, цифр, точек и строк.',
		no_user: 'Такого пользователя не найдено. Пожалуйста, проверьте свое имя пользователя.',
		wrong_password: 'Вы ввели неправильный пароль. Пожалуйста, проверьте свой пароль.',
		username: 'Имя пользователя',
		password: 'пароль',
		password_again: 'Пароль Снова',
		login: 'Войти',
		have_no_account: 'Еще нет учетной записи?',
		register: 'Зарегистрироваться',
		have_you_forgot_password: 'Ты забыл свой пароль?',
		password_reset: 'Сброс Пароля',
		must_agree_agreement: 'Вы должны согласиться с условиями обслуживания и использования, данными и политикой конфиденциальности.',
		email_empty: 'E-Mail не может быть пустым..',
		email_wrong: 'Ваш адрес E-Mail почты неверен.',
		password_less: 'Ваш пароль не может быть короче 5 символов.',
		password_not_match: 'Ваши пароли не совпадают.',
		captcha_empty: 'Код подтверждения не может быть пустым.',
		email_in_use: 'Этот адрес E-Mail почты используется другим пользователем.',
		expired_captcha: 'Время проверки кода безопасности прошло. Пожалуйста, повторно введите код безопасности.',
		some_empty: 'Вы не заполнили некоторые поля. Пожалуйста, проверьте свою информацию и повторите попытку.',
		username_in_use: 'Это имя пользователя используется другим пользователем.',
		username_not_allowed: 'Это имя пользователя недоступно.',
		wrong_captcha: 'Код подтверждения неверен. Пожалуйста, попробуйте еще раз.',
		terms_of_use: 'Условия Использования.',
		privacy_policy: 'Данные и Политика конфиденциальности',
		name: 'Имя',
		surname: 'Фамилия',
		email: 'E-Mail',
		captcha: 'Код Безопасности',
		have_an_account: 'У тебя есть аккаунт?',
		just_now: 'Недавно',
		seconds_ago: ' секунды назад',
		minutes_ago: ' минуту назад',
		hours_ago: ' несколько часов назад',
		days_ago: ' дней назад',
		weeks_ago: ' недель назад',
		months_ago: ' месяц назад',
		years_ago: ' год назад',
		no_post_data: 'Не удалось отправить информацию о доставке. Пожалуйста, попробуйте позже.',
		same_comment_error: 'Вы уже комментировали этот пост раньше.',
		comment_auth_error: 'Только пользователь, поделившийся комментарием, может удалить этот комментарий.',
		no_comments_made: 'У этого поста нет комментариев.',
		comments: 'Комментарии',
		your_comment: 'Комментарии...',
		send: 'Отправить',
		delete_comment: 'Удалить Комментарий',
		delete_comment_dialog: 'Вы уверены, что хотите удалить этот комментарий? Этот процесс не может быть отменен.',
		unknown: 'Неизвестно',
		no_connection: 'Не удалось установить связь с сервером. \n\n Проверьте подключение к Интернету и повторите попытку.',
		try_again: 'Попробуй еще раз',
		notifications: 'Уведомления',
		notif_commented: 'прокомментировал ваш пост',
		notif_liked_comment: 'понравился ваш комментарий',
		notif_followed: 'начал следовать за вами',
		notif_liked_post: 'понравился твой пост',
		notif_tagged_on_comment: 'отметил вас в комментарии',
		notif_tagged_on_post: 'отметил вас в сообщении',
		notif_unfollow: 'seni takipten çıkardı',
		notif_warning: 'Вы получили предупреждение: ',
		no_notifs: 'У вас не было непрочитанных уведомлений за последние 3 дня.',
		no_follows: 'Этому пользователю не на кого подписаться.',
		no_followers: 'На этого пользователя нет подписчиков.',
		search: 'Обыск',
		no_search_results: 'Результаты поиска не найдены',
		blocked_users: 'Заблокированные пользователи',
		no_blocked_users: 'Заблокированных пользователей нет.',
		old_password_empty: 'Ваш старый пароль не может быть пустым.',
		new_password_empty: 'Ваш новый пароль не может быть пустым.',
		new_password_less: 'Ваш новый пароль не может быть короче 5 символов.',
		old_password: 'Ваш Старый Пароль',
		new_password: 'Ваш Новый Пароль',
		new_password_again: 'Ваш Новый Пароль Снова',
		change_password: 'Изменение Пароля',
		change_password_success: 'Ваш пароль был успешно обновлен.',
		edit_profile: 'Изменить Профиль',
		bio: 'относительно',
		edit_profile_success: 'Ваш профиль был успешно обновлен.',
		theme: 'Тема',
		logout: 'Выход',
		logout_dialog: 'Вы уверены, что хотите выйти из своей учетной записи?',
		theme_light: 'Светлый',
		theme_dark: 'Темный',
		theme_timed: 'Таймер',
		theme_system: 'Системные установки по умолчанию',
		cropper_title: 'Установить размер изображения',
		loading: 'Загрузка...',
		choose: 'Выбрать',
		image_size_more: 'Выбранный размер файла не может превышать 20МБ.',
		must_choose: 'Вы должны выбрать хотя бы один носитель или написать сообщение.',
		waiting_to_post: 'У вас есть запись, которой сейчас делятся. Дождитесь завершения загрузки перед публикацией нового сообщения',
		perm_settings_error: 'При открытии настроек разрешений возникла проблема.',
		share_post: 'Поделиться публикацией',
		file_perm_unavailable:
			'Чтобы продолжить, нам нужны права доступа к файлам. \n Но ваше устройство не поддерживает права доступа к файлам. \n Если вы считаете, что это ошибка, свяжитесь с нами.',
		file_perm_ask:
			'Чтобы продолжить, нам нужны права доступа к файлам. \n\n Мы используем только права доступа к файлам для содержания сообщений.',
		file_perm_open_settins: 'Открыть настройки приложения',
		message: 'Сообщение',
		tags: 'этикетки',
		share_dialog: 'Вы уверены, что хотите поделиться своим постом?',
		user_block_success: 'Пользователь успешно заблокирован. Разблокировать пользователя можно на странице настроек.',
		user_unblock_success: 'Пользователь успешно разблокирован.',
		pp_photo_success: 'Изображение профиля успешно обновлено.',
		bg_photo_success: 'Фоновая фотография успешно обновлена.',
		no_image: 'Фото не выбрано. Пожалуйста, попробуйте еще раз.',
		file_not_supported: 'Формат загруженного вами файла не поддерживается. Пожалуйста, попробуйте еще раз с другим файлом.',
		file_open_error: 'При открытии файла возникла проблема. Пожалуйста, проверьте права доступа к файлу и попробуйте еще раз.',
		follows: 'Отслеживание',
		followers: 'Последователь',
		no_posts: 'Сообщений не найдено',
		not_found: 'Не найден',
		user_not_found: 'Этот пользователь не найден. Имя пользователя могло быть изменено.',
		block_user_dialog:
			'Вы уверены, что хотите заблокировать этого пользователя? Вы не сможете видеть сообщения и комментарии, связанные с этим пользователем, пока не разблокируете его.',
		block: 'Блокировать',
		check_network: 'Пожалуйста, проверьте ваше интернет-соединение и попробуйте еще раз.',
		settings: 'Настройки',
		explore: 'Обнаружить',
		memelord: 'Мемелорд',
		profile: 'Профиль',
		posts: 'Сообщения',
		unblock: 'Снять барьеры',
		spam: 'Спам',
		abusive: 'Крайне оскорбительный',
		objectionable: 'Нежелательный',
		sexual: 'Сексуальный контент',
		already_reported: 'Вы уже жаловались на этот пост.',
		hide: 'Спрятать',
		not_reported: 'Чтобы скрыть сообщение, вы должны сначала пожаловаться.',
		already_hidden: 'Вы уже скрыли этот пост.',
		report_user_dialog:
			"Вы уверены, что хотите пожаловаться на этого пользователя? Это действие не может быть отменено. Если вам просто не нравится общий контент, выберите опцию 'Заблокировать'",
		user_report_success: 'Пользователь успешно отправил жалобу. Наши менеджеры рассмотрят ваш запрос в кратчайшие сроки.',
		comment_empty: 'Ваш комментарий не может быть пустым.',
		too_fast_action: 'Biraz hızlı işlem yapıyorsunuz. Lütfen daha sonra tekrar deneyiniz.',
		media: 'СМИ',
		detail: 'Деталь',
		picture: 'Картина',
		video: 'видео',
		sponsored: 'Спонсируемый',
		image_thin: 'Загруженное изображение слишком тонкое или слишком толстое. Соотношение сторон изображения должно быть от 1:2 до 2:1.',
	},
	de: {
		code: 'de',
		langName: 'Deutsch',
		language: 'Sprache',
		success: 'Erfolgreich!',
		error: 'Fehler!',
		ok: 'ok',
		unknown_error: 'Entschuldigung, es ist ein unbekannter Fehler aufgetreten. ',
		share_text: 'Ich denke, du wirst dieses Beitrag mögen, das auf sib0p geteilt wird: ',
		share: 'teilen',
		report: 'beschweren',
		delete: 'löschen',
		cancel: 'abrechnen',
		delete_post: 'Beitrag löschen',
		report_dialog: 'Möchten Sie diesen Beitrag wirklich melden? Diese Aktion kann nicht rückgängig gemacht werden.',
		delete_dialog: 'Möchten Sie diesen Beitrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
		no_post_error: 'Beitrag nicht gefunden, möglicherweise gelöscht..',
		no_comment_error: 'Kommentar nicht gefunden, möglicherweise gelöscht..',
		no_user_error: 'Dieser Benutzer wurde nicht gefunden. Der Benutzername hat sich möglicherweise geändert..',
		no_comments: 'Kein kommentar',
		comments_count: 'Kommentar',
		video_load_error: "Video konnte nicht geladen werden{'\n'}Tippen Sie auf, um es erneut zu versuchen.",
		post_auth_error: 'Nur der Benutzer, der den Beitrag geteilt hat, kann diesen Beitrag löschen.',
		report_success: 'Der Beitrag wurde erfolgreich gemeldet Unsere kollegen werden Ihre Anfrage so schnell wie möglich prüfen Berichtstyp: ',
		report_success_hide: 'Möchten Sie diesen Beitrag verstecken? Diese Aktion ist irrevesibel und Sie werden diesen Beitrag nie wieder sehen.',
		post_share_success: 'Ihr Beitrag wurde erfolgreich geteilt...',
		post_share_error: 'Es gab ein unbekanntes fehler beim Teilen Ihres Beitrags. Bitte versuchen Sie es später noch einmal.',
		wrong_username_error: 'Sie versuchen, mit einem falschen Benutzernamen zu arbeiten. Bitte versuchen Sie es später noch einmal.',
		follow: 'Folgen',
		unfollow: 'entfolgen',
		username_empty: 'Benutzername darf nicht leer sein.',
		username_less: 'Der Benutzername darf nicht kürzer als 4 Zeichen sein.',
		password_empty: 'Ihr Passwort darf nicht leer sein.',
		couldnt_take_login_info: 'Anmeldeinformationen konnten nicht abgerufen werden. Bitte versuchen Sie es später noch einmal.',
		wrong_username: 'Bitte stellen Sie sicher, dass Ihr Benutzername nur aus englischen Zeichen, Zahlen, Punkten und Zeilen besteht.',
		no_user: 'Es wurde kein solcher Benutzer gefunden. Bitte überprüfen Sie Ihren Benutzernamen.',
		wrong_password: 'Sie haben das falsche Passwort eingegeben. Bitte überprüfen Sie Ihr Passwort.',
		username: 'Benutzername',
		password: 'Passwort',
		password_again: 'Passwort erneut',
		login: 'Anmelden',
		have_no_account: 'Haben Sie noch keinen Account?',
		register: 'Registieren',
		have_you_forgot_password: 'Haben Sie Ihr Passwort vergessen?',
		password_reset: 'Passwort zurücksetzen',
		must_agree_agreement: 'Sie müssen die Nutzungsbedingungen, Daten und Datenschutzbestimmungen akzeptieren.',
		email_empty: 'E-Mail darf nicht leer sein.',
		email_wrong: 'Ihre E-Mail-Adresse ist nicht korrekt.',
		password_less: 'Ihr Passwort darf nicht weniger als 5 Zeichen lang sein.',
		password_not_match: 'Die eingegebenen Passwörter stimmen nicht überein.',
		captcha_empty: 'Der Bestätigungscode darf nicht leer sein.',
		email_in_use: 'Diese E-Mail-Adresse wird von einem anderen Benutzer verwendet.',
		expired_captcha: 'Die Überprüfungszeit für den Sicherheitscode ist abgelaufen. Bitte geben Sie den Sicherheitscode erneut ein.',
		some_empty: 'Einige Felder wurden nicht ausgefüllt. Bitte überprüfen Sie Ihre Informationen und versuchen Sie es später erneut.',
		username_in_use: 'Dieser Benutzername wird von einem anderen Benutzer verwendet.',
		username_not_allowed: 'Dieser Benutzername kann nicht verwendet werden.',
		wrong_captcha: 'Der Verifizierungscode ist nicht korrekt. Bitte versuche es erneut.',
		terms_of_use: 'Nutzungsbedingungen',
		privacy_policy: 'Daten- und Datenschutzbestimmungen',
		name: 'Name',
		surname: 'Nachname',
		email: 'E-Mail Adresse',
		captcha: 'Sicherheitscode',
		have_an_account: 'Haben Sie einen Account?',
		just_now: 'Kürzlich',
		seconds_ago: ' Sekunden zuvor',
		minutes_ago: ' vor minuten',
		hours_ago: ' vor stunden',
		days_ago: ' vor tagen',
		weeks_ago: ' vor wochen',
		months_ago: ' vor monaten',
		years_ago: ' vor jahren',
		no_post_data: 'Beitag-Informationen konnten nicht gesendet werden. Bitte versuchen Sie es später noch einmal.',
		same_comment_error: 'Sie haben den gleichen Kommentar für diesen Beitrag zuvor abgegeben.',
		comment_auth_error: 'Nur der Benutzer, der den Kommentar geteilt hat, kann diesen Kommentar löschen.',
		no_comments_made: 'Es gibt keine Kommentare zu diesem Beitrag.',
		comments: 'Kommentare',
		your_comment: ' Ihr Kommentar',
		send: 'Senden',
		delete_comment: 'Kommentar löschen',
		delete_comment_dialog: 'Möchten Sie diesen Kommentar wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
		unknown: 'Unbekannt',
		no_connection: 'Konnte nicht mit dem Server kommunizieren. \n\n Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut..',
		try_again: 'Versuch es noch einmal',
		notifications: 'Benachrichtigungen',
		notif_commented: 'hat deinen Beitrag kommentiert',
		notif_liked_comment: 'ihren Kommentar gelikt',
		notif_followed: 'Begann dir zu folgen',
		notif_liked_post: 'ihren Beitrag gelikt',
		notif_tagged_on_comment: 'hat dich in einem Kommentar markiert',
		notif_tagged_on_post: 'hat dich in einem Beitrag markiert',
		notif_unfollow: 'hat dir entfolgt',
		notif_warning: 'Sie haben eine Warnung erhalten: ',
		no_notifs: 'Sie haben in den letzten 3 Tagen keine ungelesenen Benachrichtigungen erhalten.',
		no_follows: 'Dieser Benutzer hat keiner, dem er folgen.',
		no_followers: 'Diesem Benutzer folgt niemand.',
		search: 'Suche',
		no_search_results: 'Keine Suchergebnisse gefunden',
		blocked_users: 'Blockierte Benutzer',
		no_blocked_users: 'Es gibt keine blockierten Benutzer.',
		old_password_empty: 'Ihr altes Passwort darf nicht leer sein.',
		new_password_empty: 'Ihr neues Passwort darf nicht leer sein',
		new_password_less: 'Ihr neues Passwort darf nicht weniger als 5 Zeichen lang sein.',
		old_password: 'Ihr altes Passwort',
		new_password: 'Ihr neues Passwort',
		new_password_again: 'Ihr neues Passwort erneut',
		change_password: 'Passwort ändern',
		change_password_success: 'Ihr Passwort wurde erfolgreich aktuallisiert.',
		edit_profile: 'Profil bearbeiten',
		bio: 'Biografie´',
		edit_profile_success: 'Ihr Profil wurde erfolgreich aktualisiert.',
		theme: 'Thema',
		logout: 'Abmelden',
		logout_dialog: 'Möchten Sie sich sicher von Ihrem Konto abmelden?',
		theme_light: 'Hell',
		theme_dark: 'Dunkel',
		theme_timed: 'Zeitlich festgelegt',
		theme_system: 'Systemstandard ',
		cropper_title: 'Stellen Sie die Bildgröße ein',
		loading: 'Wird geladen...',
		choose: 'Wählen',
		image_size_more: 'Die ausgewählte Dateigröße darf 20 MB nicht überschreiten.',
		must_choose: 'Sie müssen mindestens ein Medien auswählen oder eine Nachricht schreiben.',
		waiting_to_post:
			'Sie haben einen Beitrag, der gerade geteilt wird. Warten Sie, bis der Upload abgeschlossen ist, bevor Sie einen neuen Beitrag veröffentlichen',
		perm_settings_error: 'Beim Öffnen der Berechtigungseinstellungen ist ein Problem aufgetreten.',
		share_post: 'Beitrag teilen',
		file_perm_unavailable:
			'Wir benötigen Dateiberechtigungen, um fortzufahren. \n Ihr Gerät unterstützt jedoch keine Dateiberechtigungen.. \n Wenn Sie glauben, dass dies ein Fehler ist, kontaktieren Sie uns.',
		file_perm_ask: 'Wir benötigen Dateiberechtigungen, um fortzufahren. \n\n Wir verwenden nur Dateiberechtigungen für Beitrag-Inhalte.',
		file_perm_open_settins: 'Öffnen Sie die Anwendungseinstellungen',
		message: 'Nachricht',
		tags: 'Etiketten',
		share_dialog: 'Möchten Sie Ihren Beitrag wirklich teilen?',
		user_block_success: 'Der Benutzer wurde erfolgreich blockiert. Sie können den Benutzer auf der Einstellungsseite entsperren.',
		user_unblock_success: 'Der Benutzer wurde erfolgreich entsperrt.',
		pp_photo_success: 'Das Profilbild wurde erfolgreich aktualisiert.',
		bg_photo_success: 'Das Hintergrundfoto wurde erfolgreich aktualisiert.',
		no_image: 'Es wurde kein Foto ausgewählt. Bitte versuche es erneut.',
		file_not_supported: 'Das von Ihnen hochgeladene Dateiformat wird nicht unterstützt. Bitte versuchen Sie es erneut mit einer anderen Datei..',
		file_open_error:
			'Beim Öffnen der Datei ist ein Problem aufgetreten. Bitte überprüfen Sie die Dateiberechtigungen und versuchen Sie es erneut.',
		follows: 'Verfolgung',
		followers: 'Abonnenten ',
		no_posts: 'Keine Beiträge gefunden',
		not_found: 'Nicht gefunden',
		user_not_found: 'Dieser Benutzer wurde nicht gefunden. Der Benutzername hat sich möglicherweise geändert.',
		block_user_dialog:
			'Möchten Sie diesen Benutzer wirklich blockieren? Sie können Beiträge und Kommentare zu diesem Benutzer erst sehen, wenn Sie ihn entsperren.',
		block: 'Blockieren',
		check_network: 'Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
		settings: 'Einstellungen',
		explore: 'Entdecken',
		memelord: 'MemeLord',
		profile: 'Profil',
		posts: 'Beiträge',
		unblock: 'entsperren',
		spam: 'Spam',
		abusive: 'Extrem missbräuchlich',
		objectionable: 'nachteilig',
		sexual: 'Sexueller Inhalt',
		already_reported: 'Sie haben sich bereits über diesen Beitrag beschwert.',
		hide: 'verstecken',
		not_reported: 'Um einen Beitrag auszublenden, müssen Sie sich zuerst beschweren.',
		already_hidden: 'Bu gönderiyi daha önce zaten gizlediniz.',
		report_user_dialog:
			"Möchten Sie diesen Benutzer wirklich melden? Diese Aktion kann nicht rückgängig gemacht werden. Wenn Ihnen der freigegebene Inhalt einfach nicht gefällt, wählen Sie bitte die Option 'Blockieren'.",
		user_report_success: 'Benutzer erfolgreich gemeldet. Unsere kollegen werden Ihre Anfrage so schnell wie möglich prüfen.',
		comment_empty: 'Ihr Kommentar darf nicht leer sein.',
		too_fast_action: 'Sie verarbeiten ein wenig schnell. Bitte versuchen Sie es später noch einmal.',
		media: 'Medien',
		detail: 'Detail',
		picture: 'Bild',
		video: 'Video',
		sponsored: 'Gesponsert',
		image_thin: 'Das von Ihnen hochgeladene Bild ist zu dünn oder zu lang. Das Seitenverhältnis kann höchstens 1: 2 oder 2: 1 betragen.',
	},
}

export { Languages, selectedLanguage as DefaultLanguage }
