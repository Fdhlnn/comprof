<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/home', function () {
    return Inertia::render('comprof/home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

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

require __DIR__.'/settings.php';
