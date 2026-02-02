<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Products\AdminProductsController;
use App\Http\Controllers\Articles\AdminArticlesController;
use App\Http\Controllers\Gallery\AdminGalleryController;
use App\Http\Controllers\Events\AdminEventsController;
use App\Http\Controllers\Clients\AdminClientsController;
use App\Http\Controllers\Dashboard\AdminDashboardController;


Route::get('/', fn() => Inertia::render('comprof/home'))->name('home');
Route::get('/about', fn() => Inertia::render('comprof/about-us'));
Route::get('/products', fn() => Inertia::render('comprof/products'));
Route::get('/clients', fn() => Inertia::render('comprof/clients'));
Route::get('/articles', fn() => Inertia::render('comprof/articles'));
Route::get('/gallery', fn() => Inertia::render('comprof/gallery'));
Route::get('/events', fn() => Inertia::render('comprof/events'));
Route::get('/contact', fn() => Inertia::render('comprof/contact'));
Route::get('/payment/{id}', fn($id) => Inertia::render('comprof/payment', ['id' => (int) $id]))->name('payment');



Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
});



Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/products', [AdminProductsController::class, 'index'])->name('admin.products');
    Route::post('/products', [AdminProductsController::class, 'store']);
    Route::put('/products/{product}', [AdminProductsController::class, 'update']);
    Route::delete('/products/{product}', [AdminProductsController::class, 'destroy']);

    Route::get('/articles', [AdminArticlesController::class, 'index'])->name('admin.articles');
    Route::post('/articles', [AdminArticlesController::class, 'store']);
    Route::put('/articles/{article}', [AdminArticlesController::class, 'update']);
    Route::delete('/articles/{article}', [AdminArticlesController::class, 'destroy']);

    Route::get('/gallery', [AdminGalleryController::class, 'index'])->name('admin.gallery');
    Route::post('/gallery', [AdminGalleryController::class, 'store']);
    Route::put('/gallery/{gallery}', [AdminGalleryController::class, 'update']);
    Route::delete('/gallery/{gallery}', [AdminGalleryController::class, 'destroy']);

    Route::get('/events', [AdminEventsController::class, 'index'])->name('admin.events');
    Route::post('/events', [AdminEventsController::class, 'store']);
    Route::put('/events/{events}', [AdminEventsController::class, 'update']);
    Route::delete('/events/{events}', [AdminEventsController::class, 'destroy']);

    Route::get('/clients', [AdminClientsController::class, 'index'])->name('admin.clients');
    Route::post('/clients', [AdminClientsController::class, 'store']);
    Route::put('/clients/{clients}', [AdminClientsController::class, 'update']);
    Route::delete('/clients/{clients}', [AdminClientsController::class, 'destroy']);
});

require __DIR__ . '/settings.php';
