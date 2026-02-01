<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Products\AdminProductsController;
use App\Http\Controllers\Articles\AdminArticlesController;

/*
|--------------------------------------------------------------------------
| PUBLIC / USER (COMPANY PROFILE)
|--------------------------------------------------------------------------
| Bisa diakses tanpa login
| Pakai MainLayout
*/

Route::get('/', fn() => Inertia::render('comprof/home'))->name('home');
Route::get('/about', fn() => Inertia::render('comprof/about-us'));
Route::get('/products', fn() => Inertia::render('comprof/products'));
Route::get('/clients', fn() => Inertia::render('comprof/clients'));
Route::get('/articles', fn() => Inertia::render('comprof/articles'));
Route::get('/gallery', fn() => Inertia::render('comprof/gallery'));
Route::get('/events', fn() => Inertia::render('comprof/events'));
Route::get('/contact', fn() => Inertia::render('comprof/contact'));
Route::get('/payment/{id}', fn($id) => Inertia::render('comprof/payment', ['id' => (int) $id]))->name('payment');


/*
|--------------------------------------------------------------------------
| AUTH (GUEST ONLY)
|--------------------------------------------------------------------------
| Login hanya untuk user yang belum login
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
});

/*
|--------------------------------------------------------------------------
| ADMIN PANEL
|--------------------------------------------------------------------------
| Wajib login + verified
| Pakai AppLayout
*/

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');



    Route::get('/products', [AdminProductsController::class, 'index'])->name('admin.products');
    Route::post('/products', [AdminProductsController::class, 'store']);
    Route::put('/products/{product}', [AdminProductsController::class, 'update']);
    Route::delete('/products/{product}', [AdminProductsController::class, 'destroy']);

    Route::get('/articles', [AdminArticlesController::class, 'index'])->name('admin.articles');
    Route::post('/articles', [AdminArticlesController::class, 'store']);
    Route::post('/articles/{article}', [AdminArticlesController::class, 'update']);
    Route::delete('/articles/{article}', [AdminArticlesController::class, 'destroy']);





    Route::get('/clients', function () {
        return Inertia::render('admin/clients');
    })->name('clients');
    Route::get('/gallery', function () {
        return Inertia::render('admin/gallery');
    })->name('gallery');
    Route::get('/events', function () {
        return Inertia::render('admin/events');
    })->name('events');
});

require __DIR__ . '/settings.php';
