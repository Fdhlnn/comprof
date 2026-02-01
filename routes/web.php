<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::get('/products', function () {
        return Inertia::render('admin/products');
    })->name('products');
    Route::get('/articles', function () {
        return Inertia::render('admin/articles');
    })->name('articles');
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
